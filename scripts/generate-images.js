// scripts/generate-images.js
const fs = require('fs');
const path = require('path');

function generateImageList() {
  const imagesDir = path.join(process.cwd(), 'public/Images');
  const outputPath = path.join(process.cwd(), 'public/images-list.json');

  try {
    // Check if Images directory exists
    if (!fs.existsSync(imagesDir)) {
      console.log('Images directory not found, creating empty list');
      fs.writeFileSync(outputPath, JSON.stringify([]));
      return;
    }

    const files = fs.readdirSync(imagesDir);

    const imagePaths = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext);
      })
      .map(file => `/Images/${file}`);

    fs.writeFileSync(outputPath, JSON.stringify(imagePaths, null, 2));
    console.log(`Generated images list with ${imagePaths.length} images`);
  } catch (error) {
    console.error('Error generating images list:', error);
    // Create empty array as fallback
    fs.writeFileSync(outputPath, JSON.stringify([]));
  }
}

generateImageList();