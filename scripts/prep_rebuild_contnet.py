#!/usr/bin/env python3
import json
import argparse
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TRANSCRIPT_BASE_DIR = Path.home() / "Documents" / "onm-library" / "sources" / "events" / "transcripts"
DEFAULT_OUTPUT_DIR = TRANSCRIPT_BASE_DIR / "rebuild_sets"


def main():
    parser = argparse.ArgumentParser(
        description="Concatenate index.md and transcript.txt files into context blocks for LLM processing.")
    parser.add_argument(
        "--sets-of", "-s",
        type=int,
        default=3,
        help="Number of MD + transcript pairs to bundle per output file context block."
    )
    parser.add_argument(
        "--output-dir", "-o",
        type=str,
        default=str(DEFAULT_OUTPUT_DIR),
        help="Directory to save the bundled context sets."
    )
    args = parser.parse_args()

    index_path = TRANSCRIPT_BASE_DIR / "index.json"
    if not index_path.exists():
        print(f"❌ Could not find index file: {index_path}. Run extract_transcripts.py first.")
        return

    try:
        video_metadata = json.loads(index_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"❌ Failed to parse index.json: {e}")
        return

    valid_bundles = []

    for item in video_metadata:
        vid = item.get("video_id")
        rel_md_path = item.get("file_path")

        if not vid or not rel_md_path:
            continue

        md_file_path = PROJECT_ROOT / rel_md_path
        transcript_file_path = TRANSCRIPT_BASE_DIR / vid / "transcript.txt"

        if not md_file_path.exists():
            print(f"⚠️ Markdown file does not exist: {md_file_path}. Skipping.")
            continue

        # Skip files that don't have downloaded transcripts yet
        if not transcript_file_path.exists():
            continue

        try:
            md_content = md_file_path.read_text(encoding="utf-8")
            transcript_content = transcript_file_path.read_text(encoding="utf-8")

            valid_bundles.append({
                "video_id": vid,
                "rel_path": rel_md_path,
                "md": md_content,
                "transcript": transcript_content
            })
        except Exception as e:
            print(f"⚠️ Error reading contents for {rel_md_path} / {vid}: {e}")

    if not valid_bundles:
        print("❌ No matching pairs of markdown files and transcripts found.")
        return

    output_path = Path(args.output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Chunk the valid bundles into sets of size args.sets_of
    chunk_size = args.sets_of
    chunks = [valid_bundles[i:i + chunk_size] for i in range(0, len(valid_bundles), chunk_size)]

    print(f"Found {len(valid_bundles)} fully prepared pairs. Bundling into {len(chunks)} sets...")

    for index, chunk in enumerate(chunks, 1):
        set_file = output_path / f"set_{index}.txt"
        content_blocks = []

        for bundle in chunk:
            block = (
                f"# ==============================================================================\n"
                f"# SOURCE FILE: {bundle['rel_path']}\n"
                f"# VIDEO ID: {bundle['video_id']}\n"
                f"# ==============================================================================\n\n"
                f"~~~markdown\n"
                f"{bundle['md']}\n"
                f"~~~\n\n"
                f"~~~transcript\n"
                f"{bundle['transcript']}\n"
                f"~~~\n"
            )
            content_blocks.append(block)

        try:
            set_file.write_text("\n\n".join(content_blocks), encoding="utf-8")
            print(f"📝 Saved {set_file} ({len(chunk)} pairs)")
        except Exception as e:
            print(f"❌ Failed to write {set_file}: {e}")

    print(f"\n🎉 Bundling completed. Files saved to: {output_path}")


if __name__ == "__main__":
    main()
