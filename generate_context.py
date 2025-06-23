#!/usr/bin/env python3
import os
import argparse
from datetime import datetime
import fnmatch
from pathlib import Path

# --- Configuration ---
# You can easily add or remove patterns here

# Patterns to always ignore, regardless of profile
# Uses fnmatch glob-style matching
BASE_IGNORE_PATTERNS = [
    ".DS_Store",
    ".git/",
    ".idea/",
    "*.pyc",
    "__pycache__/",
    "builds/",
    "node_modules/",
    "public/",
    "resources/",
    "tmp/",
    ".hugo_build.lock",
    "package-lock.json",
    "yarn.lock",
    "go.sum",
    "Thumbs.db",
    ".dist",
    ".tmp",
    ".lock",
    ".sass-cache",
    "npm-debug.log",
    "jsconfig.json",
    "hugo_stats.json",
    "*-og-*.jpg", # Ignore generated OG images
    "content/blog/spiking-neural-network-framework-benchmarking/*.json", # Exclude large data files
    "content/blog/efficient-compression-event-based-data-neuromorphic-applications/*.json",
    "static/plugins/font-awesome/svgs/*" # Exclude all individual SVG icons
]

# Binary file extensions to list by path only
BINARY_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg',
    '.woff', '.woff2', '.ttf', '.eot', '.otf',
    '.ico', '.pdf', '.zip', '.gz', '.tar', '.rar'
}

# --- Profile Definitions ---
# Each key is a profile name. The value is a list of paths to include.
# Directories will be walked recursively.
PROFILES = {
    "layout-and-style": [
        "hugo.toml",
        "config/_default/",
        "layouts/",
        "assets/scss/",
        "assets/js/",
        "data/",
        "package.json",
        "tailwind.config.js",
        "postcss.config.js",
        ".gitignore",
        "content/about/_index.md", # Representative content
        "content/blog/spiking-neural-network-framework-benchmarking/index.md", # Representative content
    ],
    "content-authoring": [
        "hugo.toml",
        "config/_default/menus.en.toml",
        "config/_default/params.toml",
        "archetypes/",
        "layouts/_default/single.html",
        "layouts/blog/single.html",
        "layouts/partials/components/",
        "CONTRIBUTING.md",
    ],
    "ci-build": [
        ".github/workflows/",
        "package.json",
        "hugo.toml",
        "postcss.config.js",
        "tailwind.config.js",
        "scripts/",
        ".gitignore",
    ],
    "full": [
        "./" # The "full" profile includes everything from the root
    ]
}

# --- Core Functions ---

def is_excluded(path_obj: Path, project_root: Path, custom_ignore_patterns=None):
    """Check if a file or directory should be ignored."""
    if custom_ignore_patterns is None:
        custom_ignore_patterns = []

    all_ignore_patterns = BASE_IGNORE_PATTERNS + custom_ignore_patterns

    # Use POSIX-style paths for consistent pattern matching
    path_str = path_obj.as_posix()

    for pattern in all_ignore_patterns:
        if fnmatch.fnmatch(path_str, f"*/{pattern}") or fnmatch.fnmatch(path_obj.name, pattern):
            return True
    return False

def collect_files(start_paths, project_root):
    """Recursively collect all files from a list of starting paths, respecting ignores."""
    all_files = set()
    for start_path in start_paths:
        full_start_path = project_root / start_path
        if not full_start_path.exists():
            print(f"Warning: Path '{start_path}' not found. Skipping.")
            continue

        if full_start_path.is_dir():
            for root, dirs, files in os.walk(full_start_path):
                root_path = Path(root)
                # Filter out excluded directories in-place
                dirs[:] = [d for d in dirs if not is_excluded(root_path / d, project_root)]
                for name in files:
                    file_path = root_path / name
                    if not is_excluded(file_path, project_root):
                        all_files.add(file_path)
        elif not is_excluded(full_start_path, project_root):
            all_files.add(full_start_path)

    return sorted(list(all_files))

def main():
    """Main function to generate the context file based on command-line arguments."""
    parser = argparse.ArgumentParser(
        description="Generate a context file for an LLM by consolidating project files.",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument(
        '--profile',
        choices=PROFILES.keys(),
        default='layout-and-style',
        help=(
            "The profile to use for gathering files:\n"
            "  full:               Include all non-ignored files.\n"
            "  layout-and-style:   Focus on Hugo layouts, SCSS, JS, and config (default).\n"
            "  content-authoring:  Focus on archetypes, contribution guides, and key layouts.\n"
            "  ci-build:           Focus on GitHub Actions, scripts, and build configs."
        )
    )
    parser.add_argument(
        '--include-content',
        nargs='*',
        default=[],
        help="One or more specific content file or directory paths to include."
    )
    parser.add_argument(
        '--output',
        default='tmp/output_full.txt',
        help="The path to the output file."
    )

    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent
    output_path = project_root / args.output

    # Ensure the output directory exists
    output_path.parent.mkdir(exist_ok=True)

    # Define files to ignore based on the output file itself
    custom_ignores = [output_path.name]

    print(f"Using profile: '{args.profile}'")

    # Get files based on the selected profile
    paths_to_include = PROFILES[args.profile]

    # Add any explicitly included content paths
    if args.include_content:
        paths_to_include.extend(args.include_content)
        print(f"Additionally including: {', '.join(args.include_content)}")

    files_to_process = collect_files(paths_to_include, project_root)

    with open(output_path, 'w', encoding='utf-8') as outfile:
        # Write header
        outfile.write("--- START OF FILE output_full.txt ---\n\n")
        outfile.write("--- START OF PROJECT CONTEXT (Full Checkpoint) ---\n\n")
        outfile.write(f"This file contains the content of key configuration, source code, layout, and content files for the project. Image files are listed by path only. This serves as a full checkpoint.\n\n")
        outfile.write(f"**Project Root:** {project_root.as_posix()}\n")
        outfile.write(f"**Generated on:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} \n\n")
        outfile.write("**Instructions for AI:**\n")
        outfile.write("1.  **Analyze Structure:** Understand the Hugo project layout (config, content, layouts, assets, static structure).\n")
        outfile.write("2.  **Primary Goal:** Use this information to answer questions about the website's implementation, structure, features, styling, configuration, and potential areas for improvement or troubleshooting.\n")
        outfile.write("3.  Provide Code with focus toward with minimal commenting\n")
        outfile.write("4. dont include {{{{/* comments */}}}}, every time it confuses hugo and causes errors\n")
        outfile.write("5. If we are copying or moving files, provide the bash command to accomplish this\n")
        outfile.write("6. We don't need to make backups of files before big edits - there is sufficient rollback capability in dev environment\n")
        outfile.write("7. If a solution is found for a particularly difficult issue, suggest updates to these instructions (generate_context.py)\n")
        outfile.write("8. If code contains a code block, special handling may be required as the ``` often break the codeblock implementation\n")
        outfile.write("9. Format code changes in a way that is most simple for an LLM (gemini, copilot) to integrate - this could be one single code block. It is not necessary to provide human instructions that highlight the specific lines being updated.\n")
        outfile.write("10. indicate which file it is to be updated, outside of the file codeblock\n\n")
        outfile.write("11. Do not dedicate time to acknowledging the prompter in an emotional manner. Full focus to solving issues and presenting solutions\n\n")
        outfile.write("--- FILE CONTENTS START ---\n\n")

        # Process and write file contents
        for file_path in files_to_process:
            relative_path = file_path.relative_to(project_root).as_posix()

            # For minified JS, just note its existence
            if file_path.name.endswith(".min.js"):
                 outfile.write(f"\n=== SKIPPED MINIFIED JS: {relative_path} ===\n")
                 continue

            if file_path.suffix.lower() in BINARY_EXTENSIONS:
                outfile.write(f"\n=== IMAGE FILE: {relative_path} ===\n")
                continue

            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                    content = infile.read()
                    outfile.write(f"\n=== {relative_path} ===\n")
                    outfile.write(content.strip())
                    outfile.write("\n")
            except Exception as e:
                outfile.write(f"\n=== ERROR READING: {relative_path} -> {e} ===\n")

        # Write footer
        outfile.write("\n\n--- END OF PROJECT CONTEXT ---\n")

    print(f"\n✅ Successfully generated context file with {len(files_to_process)} files.")
    print(f"Output saved to: {output_path}")

if __name__ == "__main__":
    main()
