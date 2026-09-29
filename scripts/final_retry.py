#!/usr/bin/env python3
"""Final retry: skip VLM, just use top Pexels result (sorted by relevance)."""
import json
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, "/home/z/my-project/scripts")
from swap_to_pexels import fetch_pexels_search, download_pexels_image, SALON_DIR

RETRIES = [
    ("hero.png", "luxury spa treatment room"),
    ("specialist-3.png", "male portrait professional"),
]

for filename, query in RETRIES:
    print(f"\n→ {filename} (query: {query!r})")
    # Skip if already real (not AI)
    target = SALON_DIR / filename
    if target.exists():
        size = target.stat().st_size
        # AI-generated images are 1MB+. Real Pexels images are <1MB usually.
        # If the file is small enough to be a real photo, skip.
        if size < 500_000:
            print(f"  Already real photo ({size:,} bytes), skipping")
            continue

    ids = fetch_pexels_search(query)
    if not ids:
        print(f"  ! No candidates found")
        continue
    print(f"  Found {len(ids)} candidates, trying top 3 by file size")

    # Try top 3 candidates, pick the largest (usually the highest-quality main image)
    best = None
    best_size = 0
    for i, photo_id in enumerate(ids[:5]):
        cache_path = Path(f"/tmp/final-{filename}-{photo_id}.jpg")
        ok, size = download_pexels_image(photo_id, cache_path)
        if not ok:
            continue
        print(f"    Candidate {i+1}: ID {photo_id}, {size:,} bytes")
        if size > best_size:
            best_size = size
            best = (photo_id, cache_path)
        time.sleep(1)

    if best:
        photo_id, cache_path = best
        dest = SALON_DIR / filename
        cache_path.replace(dest)
        print(f"  ✓ Using top result: {photo_id} ({best_size:,} bytes) → {dest}")
    else:
        print(f"  ! All downloads failed")
