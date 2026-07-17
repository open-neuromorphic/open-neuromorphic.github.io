#!/usr/bin/env python3

import os
import re
import argparse
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_FILE = os.path.join(SCRIPT_DIR, "onm_website_hugo_code_bundle.md")

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
    "LICENSE", "CODE_OF_CONDUCT.md", "CONTRIBUTING.md",
    "readme.md", "CONTRIBUTING-Staging.MD", "theme.toml",
    "flake.nix", "flake.lock", ".markdownlint.json",
    ".prettierrc", ".jshintrc"
}

EXCLUDE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp", ".gif",
    ".svg", ".ico", ".pdf", ".mp4", ".lock"
}

LAYOUT_EXTENSIONS = {
    ".html", ".md", ".toml", ".yaml", ".yml",
    ".json", ".js", ".ts", ".scss", ".css",
    ".xml", ".mod", ".template"
}

SCRIPTING_EXTENSIONS = {".py", ".sh"}

SAMPLING_DIRS = [
    "content/neuromorphic-computing/hardware",
    "content/neuromorphic-computing/software/snn-frameworks",
    "content/neuromorphic-computing/software/data-tools",
    "content/contributors",
    "content/neuromorphic-computing/student-talks"
]

SAMPLED_DATA_FILES = {
    "data/town_halls.toml": 3
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
        return root_dir in ("config", "data", "scripts") or rel_path in ("hugo.toml", "package.json")
    return True

def extract_frontmatter_only(content: str) -> str:
    """Return only the YAML frontmatter block from a markdown file."""
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            return content[:end + 3]
    return content  # fallback: return all if no frontmatter found

def clean_toml_content(content: str) -> str:
    """Strip decorative comment lines (e.g., #######...) from TOML files."""
    lines = content.splitlines()
    cleaned = [line for line in lines if not re.match(r'^\s*#{10,}', line)]
    return "\n".join(cleaned)

def sample_toml_array(content: str, max_entries: int) -> str:
    """A simple hacky parser to keep the first `max_entries` blocks."""
    lines = content.splitlines()
    out = []
    blocks = 0
    for line in lines:
        if line.strip().startswith("[["):
            blocks += 1
            if blocks > max_entries:
                out.append("\n# ... (remaining entries elided to save context space) ...")
                break
        out.append(line)
    return "\n".join(out)

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

def gather_project_data(root_dir: str, scope: str, since: str = None, frontmatter_only: bool = False) -> tuple[str, str, int]:
    changed_files = get_changed_files_since(since) if since else None
    map_paths = []
    bundled_blocks = []
    bundled_count = 0
    sampling_counts = {}

    for root, dirs, files in os.walk(root_dir):
        # Filter directories
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

            ext = os.path.splitext(f)[1].lower().strip()
            if ext in EXCLUDE_EXTENSIONS:
                continue

            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, root_dir).replace("\\", "/")

            # Add to directory map
            map_paths.append(rel_path)

            # Check if file should be bundled
            if changed_files is not None and rel_path not in changed_files:
                continue
            if not is_in_scope(rel_path, scope):
                continue

            # Exclude non-Hugo blog research bundles but keep them in map_paths
            if rel_path.startswith("content/blog/") and ext in {".json", ".csv", ".ipynb", ".py", ".sh", ".txt"}:
                continue
            if rel_path.startswith("content/blog/") and f == "Dockerfile":
                continue

            # Restrict scripting extensions to the scripts directory and self
            if ext in SCRIPTING_EXTENSIONS and not (rel_path.startswith("scripts/") or rel_path == "generate_context.py"):
                continue
            # Ensure the file is either a layout file or an allowed script
            if ext not in LAYOUT_EXTENSIONS and ext not in SCRIPTING_EXTENSIONS:
                continue

            is_sampled_dir = False
            for s_dir in SAMPLING_DIRS:
                if rel_path.startswith(s_dir + "/") and rel_path != s_dir + "/_index.md" and ext == ".md":
                    is_sampled_dir = True
                    sampling_counts[s_dir] = sampling_counts.get(s_dir, 0) + 1
                    if sampling_counts[s_dir] > 3:
                        bundled_blocks.extend([f"### `{rel_path}`", "```markdown", "> *Content elided (schema matches archetype to save tokens)*", "```", ""])
                        break
            if is_sampled_dir and sampling_counts.get(s_dir, 0) > 3:
                bundled_count += 1
                continue

            try:
                with open(full_path, "r", encoding="utf-8", errors="replace") as file:
                    content = file.read().strip()
                if not content:
                    continue

                # Apply data transformations to save tokens
                if frontmatter_only and rel_path.startswith("content/") and ext == ".md":
                    content = extract_frontmatter_only(content)
                if ext == ".toml":
                    content = clean_toml_content(content)
                    if rel_path in SAMPLED_DATA_FILES:
                        content = sample_toml_array(content, SAMPLED_DATA_FILES[rel_path])

                lang = get_language(ext)
                bundled_blocks.extend([f"### `{rel_path}`", f"```{lang}", content, "```", ""])
                bundled_count += 1
            except Exception:
                pass

    map_str = "## DIRECTORY MAP\n> *This is a structural map of the project.*\n\n```text\n" + "\n".join(map_paths) + "\n```\n"

    bundle_str = "## CODEBASE SOURCE FILES\n\n"
    if bundled_count == 0:
        bundle_str += "> *No files matched the current scope and filter parameters.*\n"
    else:
        bundle_str += "\n".join(bundled_blocks)

    return map_str, bundle_str, bundled_count

def main():
    parser = argparse.ArgumentParser(description="Generate an economical AI context file for the ONM Hugo project.")
    parser.add_argument("--scope", choices=["all", "layouts", "content", "assets", "config"], default="all")
    parser.add_argument("--since", help="Only bundle files modified since a commit SHA or 'yesterday'.")
    parser.add_argument("--with-git-history", action="store_true", help="Include the last 10 git commits in the prompt.")
    parser.add_argument("--frontmatter-only", action="store_true", help="For content .md files, include only frontmatter to save tokens.")
    args = parser.parse_args()

    ai_directive = """# SYSTEM PROMPT & CONTEXT

STACK: Hugo (Extended) + TailwindCSS. Templates: Go HTML. Content: Markdown+frontmatter. Data: TOML/JSON. Build scripts: Node.js.

RULES:
1. No decorative comment blocks (e.g., `// ---`). Keep code dense.
2. Always output complete file content — no truncated snippets or diffs.
3. End every response with a commit message stating WHY and GOAL.
4. One code block per file, filename as header immediately above.
5. Internal links: `{{ with site.GetPage "path" }}{{ .RelPermalink }}{{ end }}` — never `relLangURL` with hardcoded paths (breaks subdirectory deploys).
"""

    print(f"🔍 Crawling project directory and generating datasets (Scope: {args.scope})...")
    git_history_str = build_git_history_section() + "\n" if args.with_git_history else ""

    dir_map_str, bundle_str, bundled_count = gather_project_data(
        SCRIPT_DIR,
        args.scope,
        args.since,
        args.frontmatter_only
    )

    output = "\n".join([ai_directive, dir_map_str, git_history_str, bundle_str])
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"\n✅ Context generation complete! ({bundled_count} files bundled)")

if __name__ == "__main__":
    main()
