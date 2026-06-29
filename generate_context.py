#!/usr/bin/env python3

import argparse
import os
import sys
from pathlib import Path
from datetime import datetime
import fnmatch

# --- Configuration ---
PROJECT_ROOT = Path(".").resolve()
TMP_DIR = PROJECT_ROOT / "tmp"
FULL_OUTPUT_FILE = TMP_DIR / "output_full.txt"
LAYOUTS_OUTPUT_FILE = TMP_DIR / "output_layouts.txt"

EXCLUDED_DIRS = [
    ".git", "node_modules", "tmp", "assets/images", "assets/plugins",
    "static/plugins", "static/images", "static/assets", ".idea", ".vscode",
    "public", "resources", "__pycache__", ".venv", "venv",
]

EXCLUDED_FILES_PATTERNS = [
    ".DS_Store", "hugo_stats.json", ".hugo_build.lock",
    str(FULL_OUTPUT_FILE.name), str(LAYOUTS_OUTPUT_FILE.name),
    "*.pyc", "*~", "package-lock.json",
]

LIST_ONLY_PATTERNS = [
    "LICENSE", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md",
]

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"}

INCLUDE_PATTERNS = [
    "*.html", "*.md", "*.toml", "*.json", "*.yaml", "*.yml", "*.scss",
    "*.js", "*.py", "*.sh", ".gitignore", "Dockerfile", "README.md",
    "go.mod", "go.sum", "package.json", "nginx.conf",
    "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.svg", "*.ico",
]

# Paths where we WANT to add file path comments at the top (e.g. `{{/* path/to/file.html */}}` or `/* path.scss */`)
# We exclude the 'content' directory from this to avoid breaking front matter.
INCLUDE_PATH_HEADERS_DIRS = ["layouts", "assets", "archetypes"]

# --- End Configuration ---

def log(message):
    print(f"[CONTEXT GEN] {message}", file=sys.stderr)

def should_ignore(path: Path, root: Path) -> bool:
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
    for pattern in INCLUDE_PATTERNS:
        if fnmatch.fnmatch(filename.lower(), pattern.lower()):
            return True
    return False

def is_list_only(filename: str) -> bool:
    for pattern in LIST_ONLY_PATTERNS:
        if fnmatch.fnmatch(filename, pattern):
            return True
    return False

def get_comment_syntax(file_path: Path):
    ext = file_path.suffix.lower()
    if ext == ".html":
        return "{{/* {} */}}\n"
    elif ext in [".scss", ".css", ".js", ".ts"]:
        return "/* {} */\n"
    elif ext in [".sh", ".py", ".yaml", ".yml", ".toml"]:
        return "# {}\n"
    return ""

def find_relevant_files(root: Path, mode: str = "full") -> list[Path]:
    initial_candidates = set()
    for current_dir_str, dir_names, file_names in os.walk(root, topdown=True):
        current_path = Path(current_dir_str)
        dir_names[:] = [d_name for d_name in dir_names if not should_ignore(current_path / d_name, root)]
        for filename in file_names:
            file_path = current_path / filename
            if should_ignore(file_path, root): continue
            if not should_include(filename): continue
            initial_candidates.add(file_path.resolve())

    final_list = list(initial_candidates)
    final_list.sort()
    return final_list

def generate_header(mode: str) -> str:
    common_instructions = """
  **CRITICAL AI CODING REQUIREMENTS:**
  1. **Token Efficiency:** DO NOT use decorative comment blocks (e.g., `// ---------`). Keep comments dense.
  2. **File Headers:** For files in `layouts/`, `assets/`, and `archetypes/`, ADD a one-line comment at the top indicating the file path (e.g., `{{/* layouts/path/to/file.html */}}` or `/* assets/path/file.scss */`). DO NOT add these to `content/` markdown files (it breaks front matter).
  3. **Commit Messages:** Provide commit message at end of response with **WHY** and **GOAL** of code changes
  4. **Complete Files:** Always provide complete file content in responses — never truncated snippets or diffs

**Instructions for AI:**
1.  **Analyze Structure:** Understand the Hugo project layout (config, content, layouts, assets, static structure).
2.  **Primary Goal:** Use this information to answer questions about the website's implementation, structure, features, styling, configuration, and potential areas for improvement or troubleshooting.
3.  Provide Code with focus toward with minimal commenting
4. If we are copying or moving files, provide the bash command to accomplish this
5. We don't need to make backups of files before big edits - there is sufficient rollback capability in dev environment
6. If a solution is found for a particularly difficult issue, suggest updates to these instructions (generate_context.py)
7. If response contains a code block, it is best to keep newlines around  ```  for maximum compatibility
8. Format code changes in a way that is most simple for an LLM (gemini, copilot) to integrate - this could be one single code block. It is not necessary to provide human instructions that highlight the specific lines being updated.
9. indicate which file it is to be updated, outside of the file codeblock
10. For internal links, always prefer `site.GetPage` and `.RelPermalink` over hardcoded paths with `relLangURL`. Hardcoded paths (`"/path/to/page/" | relLangURL`) can break in staging environments or sub-directory deployments. The robust method is `{{ $page := site.GetPage "path/to/page"; $page.RelPermalink }}`.
"""
    return f"""--- START OF PROJECT CONTEXT (Full Checkpoint) ---

This file contains the content of key configuration, source code, layout, and content files for the project. Image files and some static documents are listed by path only. This serves as a full checkpoint.

**Project Root:** {PROJECT_ROOT}
**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
{common_instructions}
--- FILE CONTENTS START ---
"""

def generate_footer(mode: str) -> str:
    return "\n--- END OF PROJECT CONTEXT ---"

def generate_context(mode: str):
    target_output_file = FULL_OUTPUT_FILE
    try: TMP_DIR.mkdir(parents=True, exist_ok=True)
    except OSError as e: sys.exit(1)

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
                    outfile.write(f"\n=== IMAGE FILE: {relative_path.as_posix()} ===\n")
                elif is_list_only(file_path.name):
                    outfile.write(f"\n=== FILE BY PATH: {relative_path.as_posix()} ===\n")
                else:
                    outfile.write(f"\n=== {relative_path.as_posix()} ===\n")
                    try:
                        content = file_path.read_text(encoding="utf-8", errors="ignore")

                        # Add path header if needed and it doesn't already have one
                        should_add_header = any(str(relative_path).startswith(d) for d in INCLUDE_PATH_HEADERS_DIRS)
                        comment_syntax = get_comment_syntax(relative_path)

                        if should_add_header and comment_syntax:
                            expected_header = comment_syntax.format(relative_path.as_posix())
                            if not content.startswith(expected_header.strip()):
                                outfile.write(expected_header)

                        outfile.write(content)
                    except Exception as e:
                        outfile.write(f"--- FAILED TO READ/DECODE {relative_path.as_posix()} ---")
                    outfile.write("\n")

            outfile.write(footer + "\n")
    except IOError as e:
        sys.exit(1)

def main():
    argparse.ArgumentParser(description="Generate context file.").parse_args()
    generate_context("full")

if __name__ == "__main__":
    main()
