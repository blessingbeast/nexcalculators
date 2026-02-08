const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputSvg = path.join(__dirname, '../public/images/icon.svg');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
    try {
        console.log('Generating favicons...');

        // 192x192 PNG
        await sharp(inputSvg)
            .resize(192, 192)
            .toFile(path.join(outputDir, 'favicon-192x192.png'));
        console.log('Generated favicon-192x192.png');

        // 96x96 PNG
        await sharp(inputSvg)
            .resize(96, 96)
            .toFile(path.join(outputDir, 'favicon-96x96.png'));
        console.log('Generated favicon-96x96.png');

        // 48x48 PNG
        await sharp(inputSvg)
            .resize(48, 48)
            .toFormat('png')
            .toFile(path.join(outputDir, 'favicon-48x48.png'));
        console.log('Generated favicon-48x48.png');

        // favicon.ico (using 48x48 png content, just renaming safely)
        // Note: Sharp doesn't output .ico directly. Modern browsers support PNG favicons.
        // Google checks favicon.ico. If it's a PNG renamed to .ico, it usually works.
        // Or we can just copy the 48x48 png to favicon.ico
        await fs.promises.copyFile(
            path.join(outputDir, 'favicon-48x48.png'),
            path.join(outputDir, 'favicon.ico')
        );
        console.log('Generated favicon.ico (from 48x48 png)');

    } catch (err) {
        console.error('Error generating favicons:', err);
        process.exit(1);
    }
}

generateFavicons();
