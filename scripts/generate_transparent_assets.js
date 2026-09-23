const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAlpha(inputPath, outputPath, alphaMultiplier, extendBase) {
  console.log(`Processing ${inputPath} -> ${outputPath}...`);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const origWidth = info.width;
  const origHeight = info.height;
  const extraWidth = extendBase ? 600 : 0;
  const targetWidth = origWidth + extraWidth;
  const targetHeight = origHeight;

  // New buffer with RGBA (4 channels)
  const outBuf = Buffer.alloc(targetWidth * targetHeight * 4);

  const offsetX = extendBase === 'left' ? 600 : 0;

  // Copy original image data into target buffer
  for (let y = 0; y < origHeight; y++) {
    for (let x = 0; x < origWidth; x++) {
      const srcIdx = (y * origWidth + x) * 4;
      const targetIdx = (y * targetWidth + (x + offsetX)) * 4;
      outBuf[targetIdx] = data[srcIdx];
      outBuf[targetIdx + 1] = data[srcIdx + 1];
      outBuf[targetIdx + 2] = data[srcIdx + 2];
      outBuf[targetIdx + 3] = data[srcIdx + 3];
    }
  }

  // Extend base if requested
  if (extendBase === 'left') {
    for (let y = 0; y < targetHeight; y++) {
      const srcIdx = (y * targetWidth + 600) * 4;
      const r = outBuf[srcIdx];
      const g = outBuf[srcIdx + 1];
      const b = outBuf[srcIdx + 2];
      for (let x = 0; x < 600; x++) {
        const targetIdx = (y * targetWidth + x) * 4;
        outBuf[targetIdx] = r;
        outBuf[targetIdx + 1] = g;
        outBuf[targetIdx + 2] = b;
        outBuf[targetIdx + 3] = 255;
      }
    }
  }

  if (extendBase === 'right') {
    const edgeX = origWidth - 1;
    for (let y = 0; y < targetHeight; y++) {
      const srcIdx = (y * targetWidth + edgeX) * 4;
      const r = outBuf[srcIdx];
      const g = outBuf[srcIdx + 1];
      const b = outBuf[srcIdx + 2];
      for (let x = origWidth; x < targetWidth; x++) {
        const targetIdx = (y * targetWidth + x) * 4;
        outBuf[targetIdx] = r;
        outBuf[targetIdx + 1] = g;
        outBuf[targetIdx + 2] = b;
        outBuf[targetIdx + 3] = 255;
      }
    }
  }

  // Convert black background to clean alpha
  for (let i = 0; i < outBuf.length; i += 4) {
    const r = outBuf[i];
    const g = outBuf[i + 1];
    const b = outBuf[i + 2];
    const maxVal = Math.max(r, g, b);
    if (maxVal < 14) {
      outBuf[i + 3] = 0;
    } else {
      outBuf[i + 3] = Math.min(255, Math.floor(maxVal * alphaMultiplier));
    }
  }

  await sharp(outBuf, {
    raw: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
    },
  })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`Finished ${outputPath}`);
}

async function run() {
  await processAlpha(
    'public/assets/long_green_arm.jpg',
    'public/assets/long_green_arm_trans.png',
    2.2,
    'left'
  );
  await processAlpha(
    'public/assets/long_human_arm.jpg',
    'public/assets/long_human_arm_trans.png',
    2.3,
    'right'
  );
  await processAlpha(
    'public/assets/clasp_handshake.jpg',
    'public/assets/clasp_handshake_trans.png',
    2.2
  );
  await processAlpha(
    'public/assets/heavenly_clouds.jpg',
    'public/assets/heavenly_clouds_trans.png',
    1.7
  );
  await processAlpha(
    'public/assets/pink_petal.jpg',
    'public/assets/pink_petal_trans.png',
    2.2
  );
  console.log('All transparent PNG assets generated successfully!');
}

run().catch(console.error);
