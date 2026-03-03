# Image Setup Instructions

This project requires two portrait images of Claudia Conen to be placed in the `public/` directory:

## Required Images:

1. **photo_2025-09-25 23.28.43.jpeg**
   - Used in: ClaudiaAI section on homepage (rotating border animation)
   - Used in: ClaudiaAI Beta page (rotating profile picture)
   - Recommended: Professional portrait, clear face visibility
   - Aspect ratio: Square or portrait (3:4)

2. **photo_2025-09-25 23.28.37.jpeg**
   - Used in: About section on homepage
   - Used in: ClaudiaAI Beta page testimonial card
   - Recommended: Professional portrait with good lighting
   - Aspect ratio: Portrait (3:4)

## How to Add Images:

1. Place both images in the `public/` directory
2. Ensure the filenames match exactly (including the date format)
3. The images will be automatically referenced by the components

## Fallback:

If images are not available, you can:
- Use placeholder images with the same filenames
- Update the image paths in the components to point to different images
- The components will still render, but may show broken image icons

## Image Locations in Code:

- `src/components/About.tsx` - Line with `/photo_2025-09-25 23.28.43.jpeg`
- `src/components/ClaudiaAI.tsx` - Line with `/photo_2025-09-25 23.28.43.jpeg`
- `src/pages/ClaudiaAIBeta.tsx` - Lines with both image paths
