#!/usr/bin/env python3
"""
Automated script to update bird backdrop images.
This script:
1. Checks for missing images in the bird_grid directory
2. Downloads random replacements from the provided JSON file
3. Updates create_backdrop.py and app/page.js with new IDs
4. Regenerates the backdrop image

Note: The ML-reference list in app/page.js is automatically updated since it's
generated from the birdImageIds array using birdImageIds.map((id) => `ML${id}`)
"""

import json
import random
import re
import sys
import subprocess
from pathlib import Path
import urllib.request
import urllib.error
import ssl

# Create SSL context that doesn't verify certificates (for Macaulay Library CDN)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE


def download_bird_image(asset_id: str, output_dir: Path, size: int = 1200) -> bool:
    """Download a bird image from Macaulay Library CDN."""
    url = f"https://cdn.download.ams.birds.cornell.edu/api/v1/asset/{asset_id}/{size}"
    output_path = output_dir / f"{asset_id}.jpg"
    
    if output_path.exists():
        print(f"  ✓ Image already exists: {output_path.name}")
        return True
    
    try:
        print(f"  Downloading {asset_id}...", end=" ", flush=True)
        with urllib.request.urlopen(url, context=ssl_context) as response:
            with open(output_path, 'wb') as f:
                f.write(response.read())
        print(f"✓")
        return True
    except urllib.error.HTTPError as e:
        print(f"✗ Failed (HTTP {e.code})")
        return False
    except Exception as e:
        print(f"✗ Failed: {e}")
        return False


def get_bird_image_ids_from_file(file_path: Path) -> list:
    """Extract bird image IDs from create_backdrop.py or app/page.js."""
    content = file_path.read_text()
    
    # Extract all IDs from the file (they're in quotes)
    ids = re.findall(r"['\"](\d{8,9})['\"]", content)
    
    # Filter to get only the bird image IDs (they should be in a specific section)
    # For create_backdrop.py, look for bird_image_ids = [
    # For app/page.js, look for birdImageIds = [
    if 'bird_image_ids' in content or 'birdImageIds' in content:
        # Find the array section
        lines = content.split('\n')
        ids = []
        in_array = False
        
        for line in lines:
            if 'bird_image_ids' in line or 'birdImageIds' in line:
                in_array = True
            if in_array:
                # Extract IDs from this line
                matches = re.findall(r"['\"](\d{8,9})['\"]", line)
                ids.extend(matches)
                # Stop when we hit the closing bracket
                if ']' in line and ids:
                    break
    
    return ids


def update_file_with_new_ids(file_path: Path, old_id: str, new_id: str) -> bool:
    """Replace an old ID with a new ID in a file."""
    content = file_path.read_text()
    
    # Replace the old ID with the new ID (ensuring we match whole IDs, not parts)
    # Use word boundaries or quotes to ensure exact match
    pattern = f"(['\"]?){re.escape(old_id)}(['\"]?)"
    replacement = f"\\g<1>{new_id}\\g<2>"
    
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        file_path.write_text(new_content)
        return True
    return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python update_backdrop.py <path_to_json_file>")
        print("Example: python update_backdrop.py /path/to/new_asset_id.json")
        sys.exit(1)
    
    json_path = Path(sys.argv[1])
    if not json_path.exists():
        print(f"Error: JSON file not found: {json_path}")
        sys.exit(1)
    
    # Get script directory
    script_dir = Path(__file__).parent
    bird_grid_dir = script_dir / 'public' / 'images' / 'bird_grid'
    create_backdrop_file = script_dir / 'create_backdrop.py'
    app_page_file = script_dir / 'app' / 'page.js'
    
    print("Loading JSON file...")
    try:
        with open(json_path, 'r') as f:
            json_data = json.load(f)
        available_ids = list(json_data.keys())
        print(f"  ✓ Loaded {len(available_ids)} asset IDs from JSON")
    except Exception as e:
        print(f"  ✗ Error loading JSON: {e}")
        sys.exit(1)
    
    # Get expected IDs from create_backdrop.py
    print("\nChecking for missing images...")
    expected_ids = get_bird_image_ids_from_file(create_backdrop_file)
    
    if len(expected_ids) != 80:
        print(f"  Warning: Expected 80 IDs, found {len(expected_ids)}")
    
    # Find missing images
    missing = []
    for img_id in expected_ids:
        if not (bird_grid_dir / f'{img_id}.jpg').exists():
            missing.append(img_id)
    
    if not missing:
        print("  ✓ All images are present!")
        print("\nRegenerating backdrop...")
        subprocess.run([sys.executable, str(create_backdrop_file)], check=True)
        return
    
    print(f"  Found {len(missing)} missing image(s): {', '.join(missing)}")
    
    # Get random replacements
    print("\nSelecting random replacements...")
    replacements = {}
    for old_id in missing:
        # Make sure we don't select an ID that's already in use
        available = [id for id in available_ids if id not in expected_ids]
        if not available:
            available = available_ids  # Fallback if all are used
        
        new_id = random.choice(available)
        replacements[old_id] = new_id
        print(f"  {old_id} -> {new_id}")
    
    # Download replacement images
    print("\nDownloading replacement images...")
    bird_grid_dir.mkdir(parents=True, exist_ok=True)
    for old_id, new_id in replacements.items():
        if not download_bird_image(new_id, bird_grid_dir):
            print(f"  ✗ Failed to download {new_id}, skipping replacement")
            del replacements[old_id]
    
    if not replacements:
        print("\n✗ No replacements were successfully downloaded. Exiting.")
        sys.exit(1)
    
    # Update files
    print("\nUpdating files...")
    files_updated = []
    
    for old_id, new_id in replacements.items():
        # Update create_backdrop.py
        if update_file_with_new_ids(create_backdrop_file, old_id, new_id):
            print(f"  ✓ Updated create_backdrop.py: {old_id} -> {new_id}")
            files_updated.append(create_backdrop_file)
        
        # Update app/page.js
        if update_file_with_new_ids(app_page_file, old_id, new_id):
            print(f"  ✓ Updated app/page.js: {old_id} -> {new_id}")
            files_updated.append(app_page_file)
    
    if not files_updated:
        print("  ✗ No files were updated")
        sys.exit(1)
    
    # Regenerate backdrop
    print("\nRegenerating backdrop...")
    try:
        subprocess.run([sys.executable, str(create_backdrop_file)], check=True)
        print("\n✓ All done!")
    except subprocess.CalledProcessError as e:
        print(f"\n✗ Error regenerating backdrop: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()

