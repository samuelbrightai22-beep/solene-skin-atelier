#!/usr/bin/env python3
"""Retry the 2 failed image swaps with broader queries and more candidates."""
import json
import subprocess
import sys
import time
import re
from pathlib import Path

sys.path.insert(0, "/home/z/my-project/scripts")
from swap_to_pexels import fetch_pexels_search, download_pexels_image, vlm_check, SALON_DIR

RETRIES = [
    ("hero.png", ["luxury spa treatment room", "spa massage room interior", "day spa interior", "spa treatment bed"],
     "luxurious spa treatment room interior with soft natural light, warm cream walls, white linen spa bed, premium salon aesthetic"),
    ("specialist-3.png", ["male portrait professional", "man portrait professional", "male barber portrait", "man headshot professional"],
     "professional male portrait, neat appearance, friendly expression, editorial portrait, premium setting"),
]

for filename, queries, need_desc in RETRIES:
    print(f"\n→ Retrying {filename}")
    found = False
    for q in queries:
        print(f"  Query: {q!r}")
        ids = fetch_pexels_search(q)
        if not ids:
            continue
        print(f"  Found {len(ids)} candidates")
        for i, photo_id in enumerate(ids[:10]):
            print(f"    Candidate {i+1}: ID {photo_id}")
            cache_path = Path(f"/tmp/retry-{photo_id}.jpg")
            ok, size = download_pexels_image(photo_id, cache_path)
            if not ok:
                continue
            print(f"      ✓ Downloaded {size:,} bytes")
            suitable, reason = vlm_check(cache_path, need_desc)
            print(f"      VLM: {'YES' if suitable else 'NO'} — {reason[:80]}")
            if suitable:
                dest = SALON_DIR / filename
                cache_path.replace(dest)
                print(f"  ✓ MATCH → {dest}")
                found = True
                break
            time.sleep(1)
        if found:
            break
        time.sleep(3)
    if not found:
        print(f"  ! Still no match — keeping AI image")
