#!/usr/bin/env python3
"""
Download bird images from Macaulay Library (Cornell Lab of Ornithology).
Images are downloaded from the CDN using asset IDs.
"""

import urllib.request
import urllib.error
import ssl
from pathlib import Path
from typing import List

# Create SSL context that doesn't verify certificates (for Macaulay Library CDN)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE


def download_bird_image(asset_id: str, output_dir: Path, size: int = 1200) -> bool:
    """
    Download a bird image from Macaulay Library CDN.
    
    Args:
        asset_id: The Macaulay Library asset ID
        output_dir: Directory to save the image
        size: Image size (default 1200px)
    
    Returns:
        True if download successful, False otherwise
    """
    url = f"https://cdn.download.ams.birds.cornell.edu/api/v1/asset/{asset_id}/{size}"
    output_path = output_dir / f"{asset_id}.jpg"
    
    if output_path.exists():
        print(f"✓ Image already exists: {output_path.name}")
        return True
    
    try:
        print(f"Downloading {asset_id}...", end=" ", flush=True)
        with urllib.request.urlopen(url, context=ssl_context) as response:
            with open(output_path, 'wb') as f:
                f.write(response.read())
        print(f"✓ Saved to {output_path.name}")
        return True
    except urllib.error.HTTPError as e:
        print(f"✗ Failed (HTTP {e.code}): {url}")
        return False
    except Exception as e:
        print(f"✗ Failed: {e}")
        return False


def download_bird_images(asset_ids: List[str], output_dir: Path) -> None:
    """
    Download multiple bird images.
    
    Args:
        asset_ids: List of Macaulay Library asset IDs
        output_dir: Directory to save images
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    
    successful = 0
    failed = 0
    
    for asset_id in asset_ids:
        if download_bird_image(asset_id, output_dir):
            successful += 1
        else:
            failed += 1
    
    print(f"\nSummary: {successful} successful, {failed} failed")


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python download_bird_images.py <asset_id1> [asset_id2] ...")
        print("Example: python download_bird_images.py 611978626 62912691")
        sys.exit(1)
    
    script_dir = Path(__file__).parent
    output_dir = script_dir / 'public' / 'images' / 'bird_grid'
    
    asset_ids = sys.argv[1:]
    download_bird_images(asset_ids, output_dir)

