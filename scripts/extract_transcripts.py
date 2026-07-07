#!/usr/bin/env python3
import os
import re
import time
import json
import random
import sys
import argparse
from pathlib import Path

try:
    from requests import Session
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api.formatters import TextFormatter
    from youtube_transcript_api._errors import RequestBlocked, FailedToCreateConsentCookie, TranscriptsDisabled, \
        NoTranscriptFound, VideoUnavailable
except ImportError:
    print("Please install the required packages: pip install youtube-transcript-api requests")
    exit(1)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / "content"
OUTPUT_BASE_DIR = Path.home() / "Documents" / "onm-library" / "event-transcripts"


def extract_video_metadata(content_dir):
    metadata = []
    video_pattern = re.compile(r'^video:\s*["\']?([a-zA-Z0-9_-]{11})["\']?', re.MULTILINE)

    for root, _, files in os.walk(content_dir):
        for file in files:
            if file.endswith(".md"):
                file_path = Path(root) / file
                try:
                    content = file_path.read_text(encoding="utf-8")
                    match = video_pattern.search(content)
                    if match:
                        video_id = match.group(1)
                        rel_path = file_path.relative_to(PROJECT_ROOT)
                        metadata.append({
                            "video_id": video_id,
                            "file_path": str(rel_path)
                        })
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    return metadata


def clean_failed_markers():
    print("🧹 Cleaning up old .failed marker files to prepare for retries...")
    count = 0
    if OUTPUT_BASE_DIR.exists():
        for path in OUTPUT_BASE_DIR.rglob(".failed"):
            try:
                path.unlink()
                count += 1
            except Exception as e:
                print(f"Could not delete {path}: {e}")
    print(f"Removed {count} old failure logs.")


def main():
    parser = argparse.ArgumentParser(description="Extract transcripts from YouTube videos.")
    parser.add_argument(
        "--retry-failed", "-r",
        action="store_true",
        help="Delete existing .failed files and attempt to download them again."
    )
    args = parser.parse_args()

    if args.retry_failed:
        clean_failed_markers()

    print("Scanning content files for YouTube video IDs...")
    video_metadata = extract_video_metadata(CONTENT_DIR)
    print(f"Found {len(video_metadata)} files containing video IDs.")

    if not video_metadata:
        print("No videos found to process.")
        return

    OUTPUT_BASE_DIR.mkdir(parents=True, exist_ok=True)

    index_file = OUTPUT_BASE_DIR / "index.json"
    try:
        index_file.write_text(json.dumps(video_metadata, indent=2), encoding="utf-8")
        print(f"✅ Saved index mapping to {index_file}")
    except Exception as e:
        print(f"Error saving index.json: {e}")

    # Configure session to spoof an Android Mobile Client (Pixel 7 / Chrome Mobile)
    session = Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Ch-Ua-Mobile": "?1",
        "Sec-Ch-Ua-Platform": '"Android"',
        "Referer": "https://m.youtube.com/"
    })

    formatter = TextFormatter()
    ytt_api = YouTubeTranscriptApi(http_client=session)
    processed_vids = set()

    for item in video_metadata:
        vid = item["video_id"]

        if vid in processed_vids:
            continue

        processed_vids.add(vid)
        vid_dir = OUTPUT_BASE_DIR / vid
        vid_dir.mkdir(parents=True, exist_ok=True)

        transcript_file = vid_dir / "transcript.txt"
        failed_file = vid_dir / ".failed"

        # Skip if transcript was already downloaded successfully
        if transcript_file.exists():
            print(f"[{vid}] ⏩ Transcript already exists. Skipping.")
            continue

        # Skip if previous fetch failed (only if not retrying)
        if failed_file.exists():
            print(f"[{vid}] ⏩ Previous attempt failed (no subtitles/disabled). Skipping.")
            continue

        print(f"[{vid}] ⏳ Fetching transcript...")
        try:
            if hasattr(ytt_api, 'fetch'):
                transcript = ytt_api.fetch(vid)
            else:
                transcript = YouTubeTranscriptApi.get_transcript(vid)

            text_formatted = formatter.format_transcript(transcript)
            transcript_file.write_text(text_formatted, encoding="utf-8")
            print(f"[{vid}] ✅ Successfully saved transcript.")

            # Use random human-like delays (between 3 and 6 seconds)
            delay = random.uniform(3.0, 6.0)
            time.sleep(delay)

        except (RequestBlocked, FailedToCreateConsentCookie) as block_err:
            print(f"\n🛑 [SYSTEM] YouTube has blocked requests from this IP: {block_err}")
            print("Aborting the run immediately to safeguard your IP reputation. Try again later.")
            sys.exit(1)

        except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable) as perm_err:
            print(f"[{vid}] ❌ Permanent skip (Subtitles disabled/unavailable): {perm_err}")
            failed_file.write_text(str(perm_err), encoding="utf-8")

        except Exception as e:
            err_str = str(e).lower()
            if "blocking requests" in err_str or "too many requests" in err_str or "requestblocked" in err_str:
                print(f"\n🛑 [SYSTEM] Detection Block Triggered: {e}")
                print("Aborting the run immediately. Try running the script again later.")
                sys.exit(1)
            else:
                print(f"[{vid}] ❌ Temporary or unknown error: {e}")


if __name__ == "__main__":
    main()
