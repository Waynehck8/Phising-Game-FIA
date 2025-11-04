const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

console.log('Image organization script');
console.log('========================');
console.log(`Looking in: ${imagesDir}`);

// Check if images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Created images directory');
}

// List current files
const files = fs.readdirSync(imagesDir);
console.log(`\nCurrent files in images directory: ${files.length}`);
files.forEach(file => {
    console.log(`- ${file}`);
});

console.log('\nExpected files for the game:');
console.log('Real websites (5):');
console.log('- facebook-real.png');
console.log('- twitter-real.png'); 
console.log('- google-real.png');
console.log('- apple-real.png');
console.log('- amazon-real.png');

console.log('\nPhishing websites (4):');
console.log('- [phishing-site-1].png');
console.log('- [phishing-site-2].png');
console.log('- [phishing-site-3].png');
console.log('- [phishing-site-4].png');

console.log('\nTo add your images:');
console.log('1. Copy your PNG files to the public/images/ directory');
console.log('2. Name them appropriately (e.g., facebook-real.png)');
console.log('3. Run this script again to verify');
