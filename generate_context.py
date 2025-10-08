#!/usr/bin/env python3

import argparse
import os
import sys
from pathlib import Path
from datetime import datetime
import fnmatch # For wildcard matching similar to shell

# --- Configuration ---
# Use Path objects for easier manipulation
PROJECT_ROOT = Path(".").resolve()  # Get absolute path of current dir

# Output files (relative to PROJECT_ROOT, placed in tmp/)
TMP_DIR = PROJECT_ROOT / "tmp"
FULL_OUTPUT_FILE = TMP_DIR / "output_full.txt"
LAYOUTS_OUTPUT_FILE = TMP_DIR / "output_layouts.txt"

# Files/Directories to EXCLUDE (relative to PROJECT_ROOT)
EXCLUDED_DIRS = [
    ".git",
    "node_modules",
    "tmp",
    "assets/images", # Standard image asset directory, often large
    "assets/plugins", # Exclude third-party JS libraries
    "static/plugins", # Exclude FontAwesome SVGs and other plugins
    "static/images", # Another common place for images
    "static/assets", # General static assets
    ".idea",
    ".vscode",
    "public", # Excluded from general scan; HTMLs added specifically if flag is set
    "resources",
    "__pycache__",
    ".venv",
    "venv",
]

# Specific file patterns/names to EXCLUDE (matched anywhere)
EXCLUDED_FILES_PATTERNS = [
    ".DS_Store",
    "hugo_stats.json",
    ".hugo_build.lock",
    str(FULL_OUTPUT_FILE.name),
    str(LAYOUTS_OUTPUT_FILE.name),
    "*.pyc",
    "*~", # Backup files
    "package-lock.json",
]

# Files to list by path only (like images), without including content
LIST_ONLY_PATTERNS = [
    "LICENSE",
    "CONTRIBUTING.md",
    "CODE_OF_CONDUCT.md",
]

# Common image file extensions
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"}

# File patterns/names to INCLUDE
INCLUDE_PATTERNS = [
    "*.html",
    "*.md",
    "*.toml",
    "*.json",
    "*.yaml",
    "*.yml",
    "*.scss",
    "*.js",
    "*.py", # Added python to include the script itself
    "*.sh",
    ".gitignore",
    "Dockerfile",
    "LICENSE",
    "README.md",
    "go.mod",
    "go.sum",
    "package.json",
    "nginx.conf",
    # Add image patterns explicitly
    "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.svg", "*.ico",
]
# --- End Configuration ---

def log(message):
    """Prints a formatted log message to stderr."""
    print(f"[CONTEXT GEN] {message}", file=sys.stderr)

def should_ignore(path: Path, root: Path) -> bool:
    """Checks if a given path should be ignored based on config."""
    relative_path_str = str(path.relative_to(root))
    parts = path.relative_to(root).parts
    for excluded_dir in EXCLUDED_DIRS:
        norm_excluded = excluded_dir.replace('/', os.sep)
        current_check_path = Path()
        for part in parts[:-1]:
            current_check_path = current_check_path / part
            if str(current_check_path) == norm_excluded:
                return True
        if path.is_dir() and str(path.relative_to(root)) == norm_excluded:
            return True


    for pattern in EXCLUDED_FILES_PATTERNS:
        if fnmatch.fnmatch(path.name, pattern):
            return True
    return False

def should_include(filename: str) -> bool:
    """Checks if a filename matches any include pattern."""
    for pattern in INCLUDE_PATTERNS:
        if fnmatch.fnmatch(filename.lower(), pattern.lower()):
            return True
    return False

def is_list_only(filename: str) -> bool:
    """Checks if a file's content should be excluded, listing only its path."""
    for pattern in LIST_ONLY_PATTERNS:
        if fnmatch.fnmatch(filename, pattern):
            return True
    return False

def find_relevant_files(root: Path, mode: str = "full", with_public_html: bool = False) -> list[Path]:
    """Walks the directory tree, applying include/exclude rules."""
    initial_candidates = set()

    log(f"Scanning directory: {root} for mode '{mode}' (main scan)")
    for current_dir_str, dir_names, file_names in os.walk(root, topdown=True):
        current_path = Path(current_dir_str)
        dir_names[:] = [d_name for d_name in dir_names if not should_ignore(current_path / d_name, root)]

        for filename in file_names:
            file_path = current_path / filename
            if should_ignore(file_path, root):
                continue
            if not should_include(filename):
                continue
            initial_candidates.add(file_path.resolve())

    log(f"Found {len(initial_candidates)} candidate files from main scan.")

    final_relevant_files_list = list(initial_candidates)
    final_relevant_files_list.sort()
    log(f"Found {len(final_relevant_files_list)} relevant files in total for mode '{mode}'.")
    return final_relevant_files_list


def generate_header(mode: str) -> str:
    """Generates the header content for the output file."""
    common_instructions = """
**Instructions for AI:**
1.  **Analyze Structure:** Understand the Hugo project layout (config, content, layouts, assets, static structure).
2.  **Primary Goal:** Use this information to answer questions about the website's implementation, structure, features, styling, configuration, and potential areas for improvement or troubleshooting.
3.  Provide Code with focus toward with minimal commenting
4. dont include {{{{/* comments */}}}}, every time it confuses hugo and causes errors
5. If we are copying or moving files, provide the bash command to accomplish this
6. We don't need to make backups of files before big edits - there is sufficient rollback capability in dev environment
7. If a solution is found for a particularly difficult issue, suggest updates to these instructions (generate_context.py)
8. If response contains a code block, it is best to keep newlines around  ```  for maximum compatibility
9. Format code changes in a way that is most simple for an LLM (gemini, copilot) to integrate - this could be one single code block. It is not necessary to provide human instructions that highlight the specific lines being updated.
10. indicate which file it is to be updated, outside of the file codeblock
11. For internal links, always prefer `site.GetPage` and `.RelPermalink` over hardcoded paths with `relLangURL`. Hardcoded paths (`"/path/to/page/" | relLangURL`) can break in staging environments or sub-directory deployments. The robust method is `{{ $page := site.GetPage "path/to/page"; $page.RelPermalink }}`.
"""
    if mode == "layouts":
        return f"""--- START OF PROJECT CONTEXT (Layouts Only) ---

This file contains the content of files found within all 'layouts' directories in the project. Image files are listed by path only.

**Project Root:** {PROJECT_ROOT}
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S %Z')}
{common_instructions.replace("1.  Analyze Structure...", "1.  **Analyze Templates:** Understand the project's templating structure. Focus on HTML/Template Structure and logic. Consider how these layouts would render content from other parts of the project.")}
--- LAYOUT FILE CONTENTS START ---
"""
    return f"""--- START OF PROJECT CONTEXT (Full Checkpoint) ---

This file contains the content of key configuration, source code, layout, and content files for the project. Image files and some static documents are listed by path only. This serves as a full checkpoint.

**Project Root:** {PROJECT_ROOT}
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
{common_instructions}
--- FILE CONTENTS START ---
"""

def generate_footer(mode: str) -> str:
    """Generates the footer content."""
    return "\n--- END OF PROJECT CONTEXT ---"

def generate_context(mode: str):
    """Main function to generate the context file based on the mode."""
    log(f"Project Root: {PROJECT_ROOT}")
    target_output_file = FULL_OUTPUT_FILE
    log(f"Mode: Generating FULL context checkpoint -> {target_output_file.relative_to(PROJECT_ROOT)}")

    try:
        TMP_DIR.mkdir(parents=True, exist_ok=True)
    except OSError as e:
        log(f"Error: Could not create output directory {TMP_DIR}: {e}")
        sys.exit(1)

    files_to_process = find_relevant_files(PROJECT_ROOT, mode=mode)
    header = generate_header(mode)
    footer = generate_footer(mode)

    try:
        with open(target_output_file, "w", encoding="utf-8") as outfile:
            outfile.write(header + "\n")

            for file_path in files_to_process:
                relative_path = file_path.relative_to(PROJECT_ROOT)
                file_extension = file_path.suffix.lower()

                if file_extension in IMAGE_EXTENSIONS:
                    log(f"  Listing image: {relative_path.as_posix()}")
                    outfile.write(f"\n=== IMAGE FILE: {relative_path.as_posix()} ===\n")
                elif is_list_only(file_path.name):
                    log(f"  Listing file by path only: {relative_path.as_posix()}")
                    outfile.write(f"\n=== FILE BY PATH: {relative_path.as_posix()} ===\n")
                else:
                    log(f"  Adding content of: {relative_path.as_posix()}")
                    outfile.write(f"\n=== {relative_path.as_posix()} ===\n")
                    try:
                        content = file_path.read_text(encoding="utf-8", errors="ignore")
                        outfile.write(content)
                    except Exception as e:
                        log(f"Warning: Failed to read content from {relative_path}: {e}")
                        outfile.write(f"--- FAILED TO READ/DECODE {relative_path.as_posix()} ---")
                    outfile.write("\n")

            outfile.write(footer + "\n")

    except IOError as e:
        log(f"Error: Could not write to output file {target_output_file}: {e}")
        sys.exit(1)

    file_size = target_output_file.stat().st_size
    log(f"Successfully generated context file: {target_output_file.relative_to(PROJECT_ROOT)} ({file_size / 1024:.2f} KB)")


def main():
    """Parses command line arguments and runs the script."""
    parser = argparse.ArgumentParser(
        description="Generate a context file with project source code for AI analysis."
    )
    # This script now only supports one mode, so no mode arguments are needed.
    args = parser.parse_args()
    generate_context("full")

if __name__ == "__main__":
    main()
