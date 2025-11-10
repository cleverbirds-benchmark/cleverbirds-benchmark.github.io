#!/usr/bin/env python3
"""
Create a composite backdrop image from bird grid images.
Arranges 80 bird images in an 8x10 grid to create a single backdrop image.
"""

from PIL import Image, ImageOps
import os
from pathlib import Path

# Bird image asset IDs in order (8 rows × 10 columns)
bird_image_ids = [
    '573697681', '428128071', '88531421', '211835021', '610451060', '72428651', '564023871', '116768801', '61383711', '316745031',
    '246875981', '92749501', '174757801', '608961847', '289306081', '614584584', '586246051', '300360751', '612959309', '178092791',
    '422231291', '612007611', '117594561', '87415241', '179573301', '611679955', '46165631', '551526071', '101165001', '134292171',
    '125987801', '450270361', '26554101', '610427401', '89210001', '537341591', '165370941', '614031554', '586608881', '586481701',
    '544108441', '235493731', '186111231', '560669831', '69662191', '406173031', '215047171', '327232121', '227464551', '160575501',
    '119087321', '68277481', '102836251', '166040121', '513049811', '92172161', '220455911', '116049931', '142874561', '602284521',
    '66677101', '230656561', '609684978', '585337501', '608937156', '284964471', '48680621', '191838061', '565126211', '160571121',
    '589092841', '620875620', '113700001', '357819031', '151864601', '195952631', '221405381', '175066671', '606431381', '173863411'
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
    
    # Get dimensions from first image to determine cell size
    if not bird_images:
        print("Error: No images loaded!")
        return
    
    # Use the first image's size as the standard cell size
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
        
        # Crop and resize image to fit cell while maintaining aspect ratio
        # ImageOps.fit crops the image to fill the size while maintaining aspect ratio
        img_fitted = ImageOps.fit(img, (cell_width, cell_height), Image.Resampling.LANCZOS)
        
        backdrop.paste(img_fitted, (x, y))
    
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

