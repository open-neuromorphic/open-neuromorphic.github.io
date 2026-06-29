#!/usr/bin/env python3

import os
import re
import argparse
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "ai_context.md")

EXCLUDE_DIRS = {
    ".git", "node_modules", "public", "resources", "tmp",
    "__pycache__", ".idea", ".vscode", "venv", ".venv"
}

EXCLUDE_PATHS = {
    "assets/images",
    "assets/plugins",
    "static/plugins",
    "static/images",
    "static/assets"
}

EXCLUDE_FILES = {
    ".DS_Store", "hugo_stats.json", ".hugo_build.lock",
    "package-lock.json", "yarn.lock", "pnpm-lock.yaml",
    "content_tagging_sheet.csv", "ai_context.md",
    "LICENSE", "CODE_OF_CONDUCT.md", "CONTRIBUTING.md"
}

SOURCE_EXTENSIONS = {
    ".html", ".md", ".toml", ".yaml", ".yml", ".json",
    ".js", ".ts", ".scss", ".css", ".py", ".sh"
}

def get_language(ext: str) -> str:
    mapping = {
        "py": "python",
        "js": "javascript",
        "ts": "typescript",
        "md": "markdown",
        "yml": "yaml",
        "sh": "bash"
    }
    cleaned_ext = ext.lower().strip(".")
    return mapping.get(cleaned_ext, cleaned_ext)

def get_changed_files_since(git_ref: str) -> set:
    try:
        cmd = ["git", "diff", "--name-only", "@{yesterday}" if git_ref.lower() == "yesterday" else git_ref, "HEAD"]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            return set(line.strip() for line in res.stdout.splitlines() if line.strip())
    except Exception as e:
        print(f"Warning: Failed to fetch diff for '--since {git_ref}': {e}")
    return set()

def is_in_scope(rel_path: str, scope: str) -> bool:
    if scope == "all":
        return True
    parts = rel_path.split("/")
    root_dir = parts[0]
    if scope == "layouts":
        return root_dir in ("layouts", "archetypes")
    elif scope == "content":
        return root_dir == "content"
    elif scope == "assets":
        return root_dir in ("assets", "static")
    elif scope == "config":
        return root_dir in ("config", "data", "scripts") or rel_path in ("hugo.toml", "theme.toml", "package.json")
    return True

def generate_directory_map(root_dir: str) -> tuple[str, list]:
    paths = []
    for root, dirs, files in os.walk(root_dir):
        new_dirs = []
        for d in dirs:
            full_dir = os.path.join(root, d)
            rel_dir = os.path.relpath(full_dir, root_dir).replace("\\", "/")
            if d in EXCLUDE_DIRS or any(rel_dir.startswith(ep) for ep in EXCLUDE_PATHS):
                continue
            new_dirs.append(d)
        dirs[:] = new_dirs

        for f in sorted(files):
            if f in EXCLUDE_FILES:
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, root_dir).replace("\\", "/")
            paths.append(rel_path)

    map_str = "## DIRECTORY MAP\n> *This is a structural map of the project. Some file contents may be omitted below to save space.* \n\n```text\n" + "\n".join(paths) + "\n```\n"
    return map_str, paths

def build_git_history_section() -> str:
    lines = [
        "## RECENT ACTIVITY LOG (Git History)",
        "> *The following are the most recent commits. Understanding the WHY and GOAL of these changes helps prevent regressions.*",
        ""
    ]
    try:
        fmt = "--pretty=format:---COMMIT---%n%cd | [%h] %s"
        result = subprocess.run(
            ["git", "log", "-n", "10", "--name-status", fmt, "--date=format:%Y-%m-%d %H:%M"],
            capture_output=True, text=True, cwd=SCRIPT_DIR, check=True
        )
        if not result.stdout.strip():
            lines.append("*No git history found.*")
        else:
            commits = result.stdout.strip().split("---COMMIT---")
            for commit in commits:
                commit = commit.strip()
                if not commit: continue
                parts = commit.split('\n')
                lines.append(f"**{parts[0]}**")
                files_modified = []
                for body_line in parts[1:]:
                    body_line = body_line.strip()
                    if not body_line: continue
                    if re.match(r'^[A-Z]\s+(.+)', body_line):
                        files_modified.append(f"  - `{body_line}`")
                if files_modified:
                    lines.append("\n**Files Updated:**")
                    lines.extend(files_modified)
                lines.append("\n---")
    except Exception as e:
        lines.append(f"*(Could not read git history: {e})*")
    return "\n".join(lines)

def bundle_source_files(root_dir: str, scope: str, since: str = None) -> tuple[str, list]:
    lines = ["## CODEBASE SOURCE FILES\n"]
    bundled_paths = []
    changed_files = get_changed_files_since(since) if since else None

    for root, dirs, files in os.walk(root_dir):
        new_dirs = []
        for d in dirs:
            full_dir = os.path.join(root, d)
            rel_dir = os.path.relpath(full_dir, root_dir).replace("\\", "/")
            if d not in EXCLUDE_DIRS and not any(rel_dir.startswith(ep) for ep in EXCLUDE_PATHS):
                new_dirs.append(d)
        dirs[:] = new_dirs

        for f in sorted(files):
            if f in EXCLUDE_FILES:
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, root_dir).replace("\\", "/")
            ext = os.path.splitext(f)[1].lower().strip()

            if ext not in SOURCE_EXTENSIONS or not is_in_scope(rel_path, scope):
                continue
            if changed_files is not None and rel_path not in changed_files:
                continue

            try:
                with open(full_path, "r", encoding="utf-8", errors="replace") as file:
                    content = file.read().strip()
                if not content:
                    continue
                lang = get_language(ext)
                lines.extend([f"### `{rel_path}`", f"```{lang}", content, "```", ""])
                bundled_paths.append(rel_path)
            except Exception:
                pass

    if not bundled_paths:
        lines.append("> *No files matched the current scope and filter parameters.*")
    return "\n".join(lines), bundled_paths

def main():
    parser = argparse.ArgumentParser(description="Generate an economical AI context file for the ONM Hugo project.")
    parser.add_argument("--scope", choices=["all", "layouts", "content", "assets", "config"], default="all")
    parser.add_argument("--since", help="Only bundle files modified since a commit SHA or 'yesterday'.")
    parser.add_argument("--with-git-history", action="store_true", help="Include the last 10 git commits in the prompt.")
    args = parser.parse_args()

    ai_directive = """# SYSTEM PROMPT & CONTEXT

**CRITICAL AI CODING REQUIREMENTS:**
1. **Token Efficiency:** DO NOT use decorative comment blocks (e.g., `// ---------`). Keep code dense.
2. **Complete Files:** Always provide complete file content in responses — never truncated snippets or diffs.
3. **Commit Messages:** Provide a commit message at the end of your response with the **WHY** and **GOAL** of code changes.
4. **Markdown Formatting:** Format code changes in a way that is easy to copy/paste (single code blocks with the filename indicated right above it).
5. **Hugo Specific Links:** For internal links, always prefer `site.GetPage` and `.RelPermalink` over hardcoded paths with `relLangURL`. Hardcoded paths (`"/path/to/page/" | relLangURL`) break in sub-directory deployments. The robust method is `{{ $page := site.GetPage "path/to/page"; $page.RelPermalink }}`.
"""
    print("🔍 Generating directory map...")
    dir_map_str, dir_paths = generate_directory_map(SCRIPT_DIR)
    git_history_str = build_git_history_section() + "\n" if args.with_git_history else ""
    print(f"📦 Bundling source files (Scope: {args.scope})...")
    bundle_str, bundle_paths = bundle_source_files(SCRIPT_DIR, args.scope, args.since)

    output = "\n".join([ai_directive, dir_map_str, git_history_str, bundle_str])
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"\n✅ Context generation complete! ({len(bundle_paths)} files bundled)")

if __name__ == "__main__":
    main()
