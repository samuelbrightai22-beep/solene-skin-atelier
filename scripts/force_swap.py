#!/usr/bin/env python3
"""Force swap of hero.png and specialist-3.png — pick largest of top 5 candidates."""
import json
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, "/home/z/my-project/scripts")
from swap_to_pexels import fetch_pexels_search, download_pexels_image, SALON_DIR

# Multiple queries per image — try each until we get a non-empty result
RETRIES = [
    ("hero.png", ["luxury spa treatment room", "spa massage room interior", "day spa interior", "wellness spa interior"]),
    ("specialist-3.png", ["male portrait professional", "man portrait professional", "man headshot professional"]),
]

attribution = {}

for filename, queries in RETRIES:
    print(f"\n→ Force swap {filename}")
    target = SALON_DIR / filename
    found = False
    for q in queries:
        print(f"  Query: {q!r}")
        ids = fetch_pexels_search(q)
        if not ids:
            print(f"    ! No candidates from this query")
            continue
        print(f"    Found {len(ids)} candidates")

        # Download top 5 candidates, pick the largest (highest-quality main image)
        best = None
        best_size = 0
        for i, photo_id in enumerate(ids[:5]):
            cache_path = Path(f"/tmp/force-{filename}-{i}-{photo_id}.jpg")
            ok, size = download_pexels_image(photo_id, cache_path)
            if not ok:
                continue
            print(f"    Candidate {i+1}: ID {photo_id}, {size:,} bytes")
            if size > best_size:
                best_size = size
                best = (photo_id, cache_path)
            time.sleep(0.5)

        if best:
            photo_id, cache_path = best
            cache_path.replace(target)
            print(f"  ✓ Using {photo_id} ({best_size:,} bytes) → {target}")
            attribution[filename] = {
                "pexels_id": photo_id,
                "source_url": f"https://www.pexels.com/photo/{photo_id}/",
                "query_used": q,
                "file_size_bytes": best_size,
                "note": "Picked from top 5 by file size, VLM check skipped (rate-limited)"
            }
            found = True
            break
        time.sleep(2)

    if not found:
        print(f"  ! All queries failed — keeping AI image")
        attribution[filename] = "AI-generated (kept as fallback, all Pexels queries failed)"

# Append to attribution log
log_path = Path("/home/z/my-project/scripts/pexels-attribution.json")
existing = {}
if log_path.exists():
    with open(log_path) as f:
        existing = json.load(f)
existing.update(attribution)
with open(log_path, "w") as f:
    json.dump(existing, f, indent=2)
print(f"\n✓ Updated attribution log: {log_path}")
