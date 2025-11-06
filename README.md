# CleverBirds

This repository contains the website for the CleverBirds benchmark. If you find it useful, please cite us!

## Managing Bird Images and Backdrop

The website uses 80 bird images from the CleverBirds dataset (Macaulay Library assets) arranged in an 8×10 grid to create a backdrop image. This section documents the workflow for managing these images.

### Overview

- **Bird images**: Stored in `public/images/bird_grid/` (80 images total)
- **Backdrop image**: `public/images/bird_backdrop.jpg` (composite of all 80 images)
- **Image IDs**: Defined in `create_backdrop.py` and `app/page.js` (must be kept in sync)

### Workflow

#### 1. Downloading Bird Images

To download new bird images from Macaulay Library, use the `download_bird_images.py` script:

```bash
python download_bird_images.py <asset_id1> [asset_id2] ...
```

Example:
```bash
python download_bird_images.py 611978626 62912691 215047171
```

Images are downloaded from the Macaulay Library CDN and saved to `public/images/bird_grid/` as `{asset_id}.jpg`.

**Note**: Asset IDs should be selected from the CleverBirds dataset assets.

#### 2. Updating Image IDs

When changing which images are used, you must update the `bird_image_ids` list in **two places**:

1. **`create_backdrop.py`** (lines 12-21): Used to generate the backdrop image
2. **`app/page.js`** (lines 8-17): Used by the website to display the backdrop

The list should contain exactly 80 asset IDs arranged in 8 rows × 10 columns.

#### 3. Creating the Backdrop

After updating the image IDs, regenerate the backdrop image:

```bash
python create_backdrop.py
```

This script:
- Loads all 80 images from `public/images/bird_grid/`
- Arranges them in an 8×10 grid with 40px gaps
- Resizes to fit web display (max 1920×1080, maintaining aspect ratio)
- Saves to `public/images/bird_backdrop.jpg`

**Important**: Ensure all 80 images exist before running this script, otherwise you'll get warnings and an incomplete backdrop.

#### 4. Cleaning Up Unused Images

After updating the image IDs, remove any images from `public/images/bird_grid/` that are no longer in use:

```bash
# Find unused images (example Python script)
python3 -c "
from pathlib import Path

# Current bird IDs in use (from create_backdrop.py)
current_ids = set([
    # ... paste the 80 IDs from create_backdrop.py ...
])

grid_dir = Path('public/images/bird_grid')
all_images = {f.stem for f in grid_dir.glob('*.jpg')}
unused = all_images - current_ids

for img_id in unused:
    print(f'rm public/images/bird_grid/{img_id}.jpg')
"

# Then delete the unused images
rm public/images/bird_grid/<unused_id1>.jpg public/images/bird_grid/<unused_id2>.jpg ...
```

#### 5. Keeping Files in Sync

**Critical**: The `bird_image_ids` list must be identical in:
- `create_backdrop.py`
- `app/page.js`

Any changes to the image selection require updates to both files. The website's ML library credits at the bottom automatically reference all IDs from `birdImageIds` in `app/page.js`.

### Complete Workflow Example

1. **Select 80 asset IDs** from the CleverBirds dataset
2. **Download missing images**:
   ```bash
   python download_bird_images.py <id1> <id2> ... <id80>
   ```
3. **Update `bird_image_ids`** in both `create_backdrop.py` and `app/page.js`
4. **Generate backdrop**:
   ```bash
   python create_backdrop.py
   ```
5. **Remove unused images** from `public/images/bird_grid/`
6. **Verify**: Check that exactly 80 images remain in the folder

### Requirements

- Python 3
- PIL/Pillow (`pip install Pillow`)
- All 80 images must exist before creating the backdrop
