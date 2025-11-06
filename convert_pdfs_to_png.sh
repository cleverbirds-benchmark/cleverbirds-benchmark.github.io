#!/bin/bash

# Convert all PDFs in public/images to high-resolution PNGs
# Uses ImageMagick with 300 DPI resolution

IMAGE_DIR="public/images"
DPI=300

echo "Converting PDFs to PNG with ${DPI} DPI resolution..."

for pdf_file in "${IMAGE_DIR}"/*.pdf; do
    if [ -f "$pdf_file" ]; then
        # Get filename without extension
        filename=$(basename "$pdf_file" .pdf)
        output_file="${IMAGE_DIR}/${filename}.png"
        
        echo "Converting: $pdf_file -> $output_file"
        
        # Convert PDF to PNG with high resolution
        # -density sets the DPI (resolution)
        # -quality 100 ensures high quality
        # -flatten ensures single image output (handles multi-page PDFs by taking first page)
        convert -density ${DPI} -quality 100 -flatten "$pdf_file" "$output_file"
        
        if [ $? -eq 0 ]; then
            echo "✓ Successfully converted: $output_file"
        else
            echo "✗ Failed to convert: $pdf_file"
        fi
    fi
done

echo "Conversion complete!"

