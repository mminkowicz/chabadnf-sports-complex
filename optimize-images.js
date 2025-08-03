const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = './src/assets';
const outputDir = './src/assets/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(assetsDir).filter(file => 
  /\.(jpg|jpeg|png|webp)$/i.test(file)
);

console.log('Found images to optimize:', imageFiles);

// Optimize each image
imageFiles.forEach(async (file) => {
  const inputPath = path.join(assetsDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  
  try {
    await sharp(inputPath)
      .resize(1200, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`✅ Optimized: ${file} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${file}:`, error.message);
  }
});

console.log('\n🎉 Image optimization complete!');
console.log('📁 Check the optimized images in: src/assets/optimized/');
console.log('💡 Replace the original images with the optimized ones.'); 