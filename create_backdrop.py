#!/usr/bin/env python3
"""
Create a composite backdrop image from bird grid images.
Arranges 80 bird images in an 8x10 grid to create a single backdrop image.
"""

from PIL import Image
import os
from pathlib import Path

# Bird image asset IDs in order (8 rows × 10 columns)
bird_image_ids = [
    '116049931', '151561221', '119087321', '92749501', '573697681', '160571121', '537341591', '102836251', '615966434', '612007611',
    '558146061', '547612131', '619622154', '614031554', '601480841', '191838061', '175066671', '178092791', '89210001', '101165001',
    '608937156', '560669831', '615525025', '300360751', '79145831', '586246051', '66677101', '79321301', '46165631', '422231291',
    '620875620', '586481701', '166040121', '68277481', '221405381', '113700001', '246875981', '564023871', '168160141', '86648961',
    '129001491', '165370941', '48680621', '235493731', '146864981', '610451060', '614371301', '69662191', '589092841', '211835021',
    '88531421', '529660791', '357819031', '565126211', '586608881', '406173031', '614548846', '621045037', '551526071', '61383711',
    '614584584', '151172591', '26554101', '186111231', '544108441', '179573301', '611978626', '89447031', '102726651', '134292171',
    '142874561', '160575501', '173863411', '220455911', '242918501', '289306081', '327232121', '428128071', '534053971', '594375981'
]

def create_backdrop():
    """Create a composite backdrop image from bird grid images."""
    # Paths
    script_dir = Path(__file__).parent
    bird_grid_dir = script_dir / 'public' / 'images' / 'bird_grid'
    output_path = script_dir / 'public' / 'images' / 'bird_backdrop.jpg'
    
    # Grid dimensions: 8 rows × 10 columns
    rows = 8
    cols = 10
    
    # Load all bird images
    bird_images = []
    for img_id in bird_image_ids:
        img_path = bird_grid_dir / f'{img_id}.jpg'
        if not img_path.exists():
            print(f"Warning: Image not found: {img_path}")
            continue
        try:
            img = Image.open(img_path)
            bird_images.append(img)
        except Exception as e:
            print(f"Error loading {img_path}: {e}")
            continue
    
    if len(bird_images) != rows * cols:
        print(f"Warning: Expected {rows * cols} images, got {len(bird_images)}")
    
    # Get dimensions from first image
    if not bird_images:
        print("Error: No images loaded!")
        return
    
    # Resize all images to the same size (use the first image's size or a standard size)
    first_img = bird_images[0]
    cell_width, cell_height = first_img.size
    
    # Gap between images (in pixels)
    gap = 40
    
    # Calculate backdrop dimensions accounting for gaps
    # (cols - 1) gaps between columns, (rows - 1) gaps between rows
    backdrop_width = cols * cell_width + (cols - 1) * gap
    backdrop_height = rows * cell_height + (rows - 1) * gap
    
    # Create the composite image with white background
    backdrop = Image.new('RGB', (backdrop_width, backdrop_height), color='white')
    
    # Paste images into grid with gaps
    for idx, img in enumerate(bird_images):
        row = idx // cols
        col = idx % cols
        # Calculate position accounting for gaps
        x = col * (cell_width + gap)
        y = row * (cell_height + gap)
        
        # Resize image to fit cell if needed
        if img.size != (cell_width, cell_height):
            img = img.resize((cell_width, cell_height), Image.Resampling.LANCZOS)
        
        backdrop.paste(img, (x, y))
    
    # Resize to a reasonable size for web use (e.g., 1920x1080 or maintain aspect ratio)
    # Calculate a good size that maintains aspect ratio
    max_width = 1920
    max_height = 1080
    
    # Maintain aspect ratio
    aspect_ratio = backdrop_width / backdrop_height
    if backdrop_width > max_width:
        backdrop_width = max_width
        backdrop_height = int(max_width / aspect_ratio)
    if backdrop_height > max_height:
        backdrop_height = max_height
        backdrop_width = int(max_height * aspect_ratio)
    
    backdrop = backdrop.resize((backdrop_width, backdrop_height), Image.Resampling.LANCZOS)
    
    # Save the composite image
    output_path.parent.mkdir(parents=True, exist_ok=True)
    backdrop.save(output_path, 'JPEG', quality=85, optimize=True)
    
    print(f"✓ Created backdrop image: {output_path}")
    print(f"  Size: {backdrop_width}x{backdrop_height}")
    print(f"  File size: {output_path.stat().st_size / 1024 / 1024:.2f} MB")

if __name__ == '__main__':
    create_backdrop()

