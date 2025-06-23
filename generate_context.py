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
# 'public' is excluded here for the general scan, but HTMLs can be added back specifically
EXCLUDED_DIRS = [
    ".git",
    "node_modules",
    "tmp",
    "assets/images", # Standard image asset directory, often large
    "assets/source-assets",
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
    "*.php",
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
        # Check if any part of the path matches an excluded directory
        # or if the relative path starts with an excluded directory
        current_check_path = Path()
        for part in parts[:-1]: # Iterate through parent directories of the file/dir
            current_check_path = current_check_path / part
            if str(current_check_path) == norm_excluded:
                return True
        if path.is_dir() and str(path.relative_to(root)) == norm_excluded: # If path itself is an excluded dir
            return True


    for pattern in EXCLUDED_FILES_PATTERNS:
        if fnmatch.fnmatch(path.name, pattern):
            return True
    return False

def should_include(filename: str) -> bool:
    """Checks if a filename matches any include pattern."""
    for pattern in INCLUDE_PATTERNS:
        if fnmatch.fnmatch(filename.lower(), pattern.lower()): # Case-insensitive match for patterns
            return True
    return False

def find_relevant_files(root: Path, mode: str = "full", with_public_html: bool = False) -> list[Path]:
    """
    Walks the directory tree, applying include/exclude rules.
    If mode is "layouts", filters for files within "layouts" directories.
    If with_public_html is True and mode is "full", also includes HTML files from ./public.
    """
    initial_candidates = set() # Use a set to handle potential overlaps gracefully

    log(f"Scanning directory: {root} for mode '{mode}' (main scan)")

    for current_dir_str, dir_names, file_names in os.walk(root, topdown=True):
        current_path = Path(current_dir_str)

        # Pruning: Modify dir_names IN-PLACE. This will skip 'public' for the main scan.
        dir_names[:] = [d_name for d_name in dir_names if not should_ignore(current_path / d_name, root)]

        for filename in file_names:
            file_path = current_path / filename

            if should_ignore(file_path, root):
                continue

            if not should_include(filename):
                continue

            initial_candidates.add(file_path.resolve()) # Store absolute paths

    log(f"Found {len(initial_candidates)} candidate files from main scan.")

    # Targeted scan for public HTML files if requested and in 'full' mode
    if with_public_html and mode == "full":
        log("Scanning 'public' directory for HTML files due to --with-public-html.")
        public_dir = root / "public"
        public_html_added_count = 0
        if public_dir.is_dir():
            for item in public_dir.rglob('*.html'): # rglob for recursive search
                if item.is_file():
                    public_file_path = item.resolve() # Ensure absolute path
                    if public_file_path not in initial_candidates: # Add if not already picked up
                        initial_candidates.add(public_file_path)
                        public_html_added_count +=1
            log(f"Added {public_html_added_count} HTML files from 'public' directory.")
        else:
            log(f"'public' directory not found at {public_dir}")

    # Filter based on mode
    final_relevant_files_list = []
    if mode == "layouts":
        log("Filtering for files in 'layouts' directories.")
        for file_path in initial_candidates: # Iterate over the set
            # A file is in a layouts directory if "layouts" is any part of its path relative to root
            if "layouts" in file_path.relative_to(root).parts:
                 final_relevant_files_list.append(file_path)
        log(f"Found {len(final_relevant_files_list)} files after 'layouts' filter.")
    else:
        final_relevant_files_list = list(initial_candidates)

    final_relevant_files_list.sort()
    log_message_suffix = ""
    if with_public_html and mode == "full":
        log_message_suffix = " (including public HTML)"
    log(f"Found {len(final_relevant_files_list)} relevant files in total for mode '{mode}'{log_message_suffix}.")
    return final_relevant_files_list


def generate_header(mode: str, with_public_html: bool = False) -> str:
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
8. If code contains a code block, special handling may be required as the ``` often break the codeblock implementation
9. Format code changes in a way that is most simple for an LLM (gemini, copilot) to integrate - this could be one single code block. It is not necessary to provide human instructions that highlight the specific lines being updated.
10. indicate which file it is to be updated, outside of the file codeblock
"""
    if mode == "layouts":
        return f"""--- START OF PROJECT CONTEXT (Layouts Only) ---

This file contains the content of files found within all 'layouts' directories in the project. Image files are listed by path only.

**Project Root:** {PROJECT_ROOT}
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S %Z')}
{common_instructions.replace("1.  Analyze Structure...", "1.  **Analyze Templates:** Understand the project's templating structure. Focus on HTML/Template Structure and logic. Consider how these layouts would render content from other parts of the project.")}
--- LAYOUT FILE CONTENTS START ---
"""
    else: # mode == "full"
        public_html_note = ""
        if with_public_html: # This flag is only relevant for 'full' mode in terms of output content
            public_html_note = "\n**Note:** HTML files from the 'public' directory are also included in this context if the `--with-public-html` flag was used."

        return f"""--- START OF PROJECT CONTEXT (Full Checkpoint) ---

This file contains the content of key configuration, source code, layout, and content files for the project. Image files are listed by path only. This serves as a full checkpoint.{public_html_note}

**Project Root:** {PROJECT_ROOT}
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S %Z')}
{common_instructions}
--- FILE CONTENTS START ---
"""

def generate_footer(mode: str) -> str:
    """Generates the footer content."""
    if mode == "layouts":
        return "\n--- END OF PROJECT LAYOUTS CONTEXT ---"
    else: # mode == "full"
        return "\n--- END OF PROJECT CONTEXT ---"

def generate_context(mode: str, with_public_html: bool):
    """Main function to generate the context file based on the mode."""
    log(f"Project Root: {PROJECT_ROOT}")
    target_output_file = None

    if mode == "full":
        target_output_file = FULL_OUTPUT_FILE
        log(f"Mode: Generating FULL context checkpoint -> {target_output_file.relative_to(PROJECT_ROOT)}")
        if with_public_html:
            log("Including HTML files from 'public' directory.")
    elif mode == "layouts":
        target_output_file = LAYOUTS_OUTPUT_FILE
        log(f"Mode: Generating LAYOUTS context -> {target_output_file.relative_to(PROJECT_ROOT)}")
        if with_public_html:
            log("Warning: --with-public-html is not typically used with --layouts mode and will have no effect on adding public HTML files.")
    else:
        log(f"Error: Invalid mode '{mode}'")
        sys.exit(1)

    try:
        TMP_DIR.mkdir(parents=True, exist_ok=True)
    except OSError as e:
        log(f"Error: Could not create output directory {TMP_DIR}: {e}")
        sys.exit(1)

    files_to_process = find_relevant_files(PROJECT_ROOT, mode=mode, with_public_html=with_public_html)

    log(f"Generating context file: {target_output_file.relative_to(PROJECT_ROOT)}")
    header = generate_header(mode, with_public_html if mode == "full" else False)
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
    log(f"Successfully generated context file: {target_output_file.relative_to(PROJECT_ROOT)} ({file_size} bytes)")

    if not files_to_process:
         log("Warning: No files matched the criteria to be included in the output.")
    elif file_size < 1000 and (mode == 'full' or mode == 'layouts'):
         log(f"Warning: The generated {mode} context file is very small. Please verify contents and include/exclude rules.")


def main():
    """Parses command line arguments and runs the script."""
    parser = argparse.ArgumentParser(
        description="Generate a context file with project source code for AI analysis. Defaults to '--full' if no mode is specified.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
Examples:
  Generate a full context checkpoint (default action):
    {sys.argv[0]}
    {sys.argv[0]} --full

  Generate a full context and include HTML files from the 'public' directory:
    {sys.argv[0]} --full --with-public-html

  Generate a context file with only content from 'layouts' directories:
    {sys.argv[0]} --layouts
"""
    )
    # If no mode flag is given, args.mode will be None, and we'll default to 'full'.
    group = parser.add_mutually_exclusive_group(required=False)
    group.add_argument(
        "-f", "--full",
        action="store_const",
        const="full",
        dest="mode",
        help=f"Generate the full project context checkpoint ({FULL_OUTPUT_FILE.relative_to(PROJECT_ROOT)})."
    )
    group.add_argument(
        "-l", "--layouts",
        action="store_const",
        const="layouts",
        dest="mode",
        help=f"Generate context with files from 'layouts' directories only ({LAYOUTS_OUTPUT_FILE.relative_to(PROJECT_ROOT)})."
    )
    parser.add_argument(
        "--with-public-html",
        action="store_true",
        help="Additionally include HTML files from the 'public' directory (primarily affects --full mode)."
    )

    args = parser.parse_args()

    # Default to 'full' mode if no other mode is selected
    mode = args.mode or "full"

    generate_context(mode, args.with_public_html)

if __name__ == "__main__":
    main()
