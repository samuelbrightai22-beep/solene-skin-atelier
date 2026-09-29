#!/usr/bin/env python3
"""Replace AI-generated salon images with real Pexels photography.

Strategy:
1. Use z-ai page_reader function to fetch Pexels search pages (server-side, bypasses Cloudflare)
2. Extract Pexels photo IDs from the rendered HTML
3. Download via Pexels CDN (images.pexels.com — no auth required)
4. Verify each image with VLM (z-ai vision) for topical fit
5. Replace AI image if the real photo fits
"""
import json
import os
import subprocess
import sys
import time
from pathlib import Path

SALON_DIR = Path("/home/z/my-project/public/salon")
SALON_DIR.mkdir(parents=True, exist_ok=True)
DOWNLOAD_DIR = Path("/home/z/my-project/scripts/pexels-cache")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Each: (filename, search_query, need_description, orientation)
IMAGE_NEEDS = [
    ("hero.png",              "luxury spa treatment room",          "luxurious spa treatment room interior with soft natural light, warm cream walls, white linen spa bed, eucalyptus, premium salon aesthetic", "landscape"),
    ("treatment-facial.png",  "facial treatment spa woman",         "woman receiving a relaxing facial treatment at a spa, professional esthetician's hands applying serum or mask, premium beauty editorial", "landscape"),
    ("treatment-led.png",     "LED light therapy facial mask",      "LED light therapy facial mask on a woman at a spa, futuristic red or blue LED device, premium skincare technology", "landscape"),
    ("treatment-massage.png", "facial massage gua sha",             "facial massage or gua sha sculpting treatment at a luxury spa, esthetician's hands performing the technique", "landscape"),
    ("interior.png",          "minimalist beauty salon interior",  "minimalist luxury beauty salon or spa interior with green plants, warm wood accents, cream walls, premium aesthetic", "landscape"),
    ("botanicals.png",        "skincare serum dropper bottle",      "botanical skincare serum in amber glass dropper bottle with calendula, rosehip, or sea buckthorn botanicals, premium product photography", "landscape"),
    ("specialist-1.png",      "female esthetician portrait",        "professional female esthetician in white uniform, soft natural makeup, calm expression, editorial portrait, premium spa setting", "portrait"),
    ("specialist-2.png",      "female dermatologist portrait",      "professional female dermatologist or doctor, white lab coat, confident expression, editorial portrait photography", "portrait"),
    ("specialist-3.png",      "male esthetician portrait",          "professional male esthetician or skincare specialist, neat appearance, friendly expression, editorial portrait, premium spa setting", "portrait"),
]

def fetch_pexels_search(query):
    """Use z-ai page_reader to fetch Pexels search results page (bypasses Cloudflare)."""
    search_url = f"https://www.pexels.com/search/{query.replace(' ', '%20')}/"
    print(f"  Fetching Pexels search: {search_url}")
    cmd = [
        "z-ai", "function", "-n", "page_reader",
        "-a", json.dumps({"url": search_url}),
        "-o", "/tmp/pexels-search.json",
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, timeout=120)
    except Exception as e:
        print(f"  ! page_reader failed: {e}", file=sys.stderr)
        return []

    # Extract photo IDs from the HTML
    import re
    try:
        with open("/tmp/pexels-search.json") as f:
            data = json.load(f)
        html = data.get("data", {}).get("html", "")
        if not html:
            print(f"  ! No HTML in response")
            return []
        # Match patterns like images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
        ids = re.findall(r"images\.pexels\.com/photos/(\d+)/[^\s\"'\\]+\.jpe?g", html)
        # Also match /photo/{slug}-{id}/ patterns
        ids2 = re.findall(r"pexels\.com/photo/[^/]+?-(\d+)/?", html)
        all_ids = list(dict.fromkeys(ids + ids2))  # dedupe preserving order
        return all_ids
    except Exception as e:
        print(f"  ! Parse failed: {e}", file=sys.stderr)
        return []

def download_pexels_image(photo_id, dest_path, width=1600, height=None):
    """Download a Pexels image via the CDN. Returns (ok, size_bytes)."""
    if height:
        url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w={width}&h={height}&fit=crop"
    else:
        url = f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w={width}"
    cmd = [
        "curl", "-sSL", "-o", str(dest_path),
        "-A", UA,
        "-H", "Accept: image/webp,image/apng,image/*,*/*;q=0.8",
        "-H", "Accept-Language: en-US,en;q=0.9",
        "--max-time", "60",
        url,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, timeout=75)
        size = dest_path.stat().st_size
        if size < 5000:  # too small, probably error page
            dest_path.unlink(missing_ok=True)
            return False, 0
        # Verify it's actually an image (JPEG, PNG, WebP, or GIF)
        result = subprocess.run(["file", str(dest_path)], capture_output=True, text=True)
        if not any(x in result.stdout for x in ["JPEG", "PNG", "Web/P", "GIF", "image"]):
            dest_path.unlink(missing_ok=True)
            return False, 0
        return True, size
    except Exception as e:
        print(f"  ! Download failed for {photo_id}: {e}", file=sys.stderr)
        return False, 0

def vlm_check(image_path, need_description):
    """Use z-ai vision to check if the image fits the need. Returns (suitable, score, reason)."""
    cmd = [
        "z-ai", "vision",
        "-p", f"Does this image show: {need_description}? Reply with EXACTLY one line: 'YES' or 'NO'. If YES, add a brief 10-word justification after a colon. Example: 'YES: serene spa room with linen bed and plants'.",
        "-i", str(image_path),
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        out = result.stdout
        # Find the content field in the JSON
        # z-ai vision prints "🚀 Sending vision chat request..." then a JSON response
        import re
        m = re.search(r'"content":\s*"([^"]+)"', out)
        if m:
            content = m.group(1)
            if content.upper().startswith("YES"):
                return True, content
            return False, content
        return False, "no parseable response"
    except Exception as e:
        print(f"  ! VLM failed: {e}", file=sys.stderr)
        return False, "error"

def main():
    print("=" * 70)
    print("Swapping AI-generated images for real Pexels photography")
    print("=" * 70)
    results = {}
    successes = 0

    for filename, query, need_desc, orient in IMAGE_NEEDS:
        print(f"\n→ {filename} ({orient})")
        print(f"  Need: {need_desc[:80]}...")

        # Fetch Pexels search results
        photo_ids = fetch_pexels_search(query)
        if not photo_ids:
            print(f"  ! No photo IDs found — keeping AI image")
            results[filename] = "AI-generated (kept as fallback)"
            continue
        print(f"  Found {len(photo_ids)} candidate photo IDs")

        # Try up to 5 candidates with VLM verification
        found_match = False
        for i, photo_id in enumerate(photo_ids[:6]):
            print(f"  Trying candidate {i+1}: ID {photo_id}")
            cache_path = DOWNLOAD_DIR / f"pexels-{photo_id}.jpg"
            ok, size = download_pexels_image(photo_id, cache_path)
            if not ok:
                print(f"    ! Download failed (size={size}), skipping")
                continue
            print(f"    ✓ Downloaded {size:,} bytes")
            # VLM verification
            suitable, reason = vlm_check(cache_path, need_desc)
            print(f"    VLM: {'YES' if suitable else 'NO'} — {reason[:100]}")
            if suitable:
                # Copy to destination
                dest = SALON_DIR / filename
                cache_path.replace(dest)
                print(f"  ✓ MATCH → {dest}")
                results[filename] = {
                    "pexels_id": photo_id,
                    "source_url": f"https://www.pexels.com/photo/{photo_id}/",
                    "verification": reason,
                    "file_size_bytes": size,
                }
                successes += 1
                found_match = True
                break
            time.sleep(1)

        if not found_match:
            print(f"  ! No suitable match in top 6 — keeping AI image")
            results[filename] = "AI-generated (kept as fallback)"

        time.sleep(3)  # Be polite to Pexels CDN

    # Save results
    out_log = Path("/home/z/my-project/scripts/pexels-attribution.json")
    with open(out_log, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\n{'=' * 70}")
    print(f"Replaced {successes} of {len(IMAGE_NEEDS)} images with real Pexels photography")
    print(f"Attribution log: {out_log}")
    print("=" * 70)

if __name__ == "__main__":
    main()
