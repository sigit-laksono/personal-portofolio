/**
 * Generate Responsive Images Script
 * Creates multiple sizes (sm, md, lg) for all images
 * Usage: node scripts/generate-responsive-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const sizes = {
  sm: 480,
  md: 768,
  lg: 1200
};

const quality = {
  jpg: 85,
  webp: 80
};

// Directories
const inputDir = 'img';
const outputDirs = {
  profile: 'img',
  projects: 'img/projects'
};

/**
 * Process a single image and generate responsive versions
 */
async function processImage(inputPath, outputDir, filename) {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  
  console.log(`Processing: ${filename}`);
  
  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original size: ${metadata.width}x${metadata.height}`);
    
    // Generate each size
    for (const [sizeName, width] of Object.entries(sizes)) {
      // Skip if original is smaller than target size
      if (metadata.width < width) {
        console.log(`  Skipping ${sizeName} (${width}w) - original is smaller`);
        continue;
      }
      
      const outputName = `${name}-${sizeName}`;
      
      // Generate JPG version
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: quality.jpg, progressive: true })
        .toFile(path.join(outputDir, `${outputName}.jpg`));
      
      console.log(`  ✓ Generated ${outputName}.jpg`);
      
      // Generate WebP version
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: quality.webp })
        .toFile(path.join(outputDir, `${outputName}.webp`));
      
      console.log(`  ✓ Generated ${outputName}.webp`);
    }
    
    // Generate WebP version of original size
    const originalWebP = `${name}.webp`;
    await sharp(inputPath)
      .webp({ quality: quality.webp })
      .toFile(path.join(outputDir, originalWebP));
    
    console.log(`  ✓ Generated ${originalWebP}`);
    console.log(`  ✓ Completed: ${filename}\n`);
    
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !/-sm|-md|-lg/.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log(`No images found in ${dir}`);
    return;
  }
  
  console.log(`\nProcessing ${imageFiles.length} images in ${dir}:\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(dir, file);
    await processImage(inputPath, dir, file);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Responsive Image Generator');
  console.log('='.repeat(60));
  console.log(`Sizes: ${Object.entries(sizes).map(([k, v]) => `${k}=${v}w`).join(', ')}`);
  console.log(`Quality: JPG=${quality.jpg}%, WebP=${quality.webp}%`);
  console.log('='.repeat(60));
  
  // Process profile images
  await processDirectory(outputDirs.profile);
  
  // Process project images
  await processDirectory(outputDirs.projects);
  
  console.log('='.repeat(60));
  console.log('✓ All images processed successfully!');
  console.log('='.repeat(60));
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
