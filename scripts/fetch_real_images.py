#!/usr/bin/env python3
"""Download real photography from Openverse (via curl) to replace AI images.

Uses curl for ALL HTTP requests because Openverse 401-blocks Python urllib
but allows curl with a real User-Agent.
"""
import json
import subprocess
import sys
import time
from pathlib import Path

OPENVERSE_API = "https://api.openverse.org/v1/images/"
SALON_DIR = Path("/home/z/my-project/public/salon")
SALON_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_NEEDS = [
    ("hero.png",              "spa treatment room",          "landscape"),
    ("treatment-facial.png",  "facial skincare",             "landscape"),
    ("treatment-led.png",     "led face mask",               "landscape"),
    ("treatment-massage.png", "facial massage",              "landscape"),
    ("interior.png",          "spa interior",                 "landscape"),
    ("botanicals.png",        "skincare bottle",              "landscape"),
    ("specialist-1.png",      "woman portrait professional", "portrait"),
    ("specialist-2.png",      "woman doctor portrait",        "portrait"),
    ("specialist-3.png",      "man portrait professional",    "portrait"),
]

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def curl_get(url, headers=None, timeout=30):
    """GET via curl, return text body. Returns None on failure."""
    cmd = ["curl", "-sSL", "--max-time", str(timeout), "-A", UA]
    for h in headers or []:
        cmd.extend(["-H", h])
    cmd.append(url)
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout + 15)
        if r.returncode != 0 or not r.stdout:
            return None
        return r.stdout
    except Exception as e:
        print(f"  ! curl GET failed: {e}", file=sys.stderr)
        return None

def curl_download(url, dest_path, min_size=3000, timeout=90):
    """Download URL to dest via curl. Returns (ok, bytes)."""
    cmd = [
        "curl", "-sSL", "-o", str(dest_path),
        "-A", UA,
        "-H", "Accept: image/webp,image/apng,image/*,*/*;q=0.8",
        "-H", "Accept-Language: en-US,en;q=0.9",
        "--max-time", str(timeout),
        url,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, timeout=timeout + 15)
        size = dest_path.stat().st_size
        if size < min_size:
            dest_path.unlink(missing_ok=True)
            return False, 0
        return True, size
    except Exception as e:
        print(f"  ! curl download failed: {e}", file=sys.stderr)
        return False, 0

def search_openverse(query, page_size=20):
    """Search via curl."""
    params = f"?q={subprocess.list2cmdline([query]).strip(chr(34))}&page_size={page_size}&license_type=commercial&mature=false"
    # Better URL encoding
    import urllib.parse
    params = urllib.parse.urlencode({
        "q": query,
        "page_size": page_size,
        "license_type": "commercial",
        "mature": "false",
    })
    url = f"{OPENVERSE_API}?{params}"
    body = curl_get(url, headers=["Accept: application/json"], timeout=30)
    if not body:
        return None
    try:
        return json.loads(body)
    except Exception as e:
        print(f"  ! JSON parse failed: {e}", file=sys.stderr)
        return None

def pick_best(results, orientation):
    candidates = []
    for r in results:
        w = r.get("width") or 0
        h = r.get("height") or 0
        if w == 0 or h == 0 or max(w, h) < 600:
            continue
        if orientation == "landscape" and w <= h:
            continue
        if orientation == "portrait" and h <= w:
            continue
        candidates.append(r)
    if not candidates:
        for r in results:
            w = r.get("width") or 0
            h = r.get("height") or 0
            if w == 0 or h == 0 or max(w, h) < 600:
                continue
            candidates.append(r)
    if not candidates:
        return None
    candidates.sort(key=lambda r: (r.get("width") or 0) * (r.get("height") or 0), reverse=True)
    return candidates[0]

def main():
    print("=" * 60)
    print("Replacing AI-generated salon images with real photography")
    print("=" * 60)
    attributions = {}
    successes = 0
    for filename, query, orient in IMAGE_NEEDS:
        print(f"\n→ {filename} ({orient})")
        print(f"  Query: {query!r}")
        data = search_openverse(query)
        if not data or not data.get("results"):
            print(f"  ! No results — keeping AI image")
            if data:
                print(f"  ! Response keys: {list(data.keys())[:5]}, sample: {str(data)[:300]}")
            attributions[filename] = "AI-generated (kept as fallback)"
            continue
        best = pick_best(data["results"], orient)
        if not best:
            print(f"  ! No suitable result — keeping AI image")
            attributions[filename] = "AI-generated (kept as fallback)"
            continue
        creator = best.get("creator", "Unknown")
        source = best.get("source", "Openverse")
        license_ = best.get("license", "CC")
        title = (best.get("title") or "")[:50]
        landing = best.get("foreign_landing_url", "")
        attribution = f"'{title}' by {creator} / {source} / {license_}"
        print(f"  Found: {attribution}")
        dest = SALON_DIR / filename
        url = best.get("url")
        # Try direct URL first
        ok, n = curl_download(url, dest)
        if not ok:
            print(f"  ! Direct failed, trying thumbnail")
            thumb_url = f"https://api.openverse.org/v1/images/{best.get('id')}/thumb/"
            ok, n = curl_download(thumb_url, dest, min_size=1500)
        if ok:
            print(f"  ✓ Downloaded {n:,} bytes → {dest}")
            attributions[filename] = {
                "attribution": attribution,
                "source_url": url,
                "landing_url": landing,
                "license": license_,
                "license_url": best.get("license_url", ""),
                "title": title,
                "creator": creator,
                "source": source,
                "file_size_bytes": n,
            }
            successes += 1
        else:
            print(f"  ! Both failed — keeping AI image")
            attributions[filename] = "AI-generated (kept as fallback)"
        time.sleep(5)  # Be polite

    attr_log = Path("/home/z/my-project/scripts/image-attributions.json")
    with open(attr_log, "w") as f:
        json.dump(attributions, f, indent=2)
    print(f"\n{'=' * 60}")
    print(f"Replaced {successes} of {len(IMAGE_NEEDS)} images with real photography")
    print(f"Attribution log: {attr_log}")
    print("=" * 60)

if __name__ == "__main__":
    main()
