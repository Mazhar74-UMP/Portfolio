import { pipeline, RawImage } from '@huggingface/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';

async function processImage(imageName, baseName) {
  console.log(`\n--- Processing ${imageName} ---`);
  const inputPath = `public/images/${imageName}`;
  const origImg = await RawImage.read(inputPath);
  const { width, height } = origImg;
  console.log(`Original dimensions: ${width}x${height}`);

  const segmenter = await pipeline('image-segmentation', 'onnx-community/BiRefNet-portrait-ONNX');
  const result = await segmenter(origImg);
  const mask = result[0]?.mask || result.mask || result;

  const rgbImg = origImg.channels === 4 ? origImg : origImg.rgba();
  const png = new PNG({ width, height });
  const maskData = mask.data;
  const rgbData = rgbImg.data;

  const scaleX = mask.width / width;
  const scaleY = mask.height / height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const maskX = Math.min(Math.floor(x * scaleX), mask.width - 1);
      const maskY = Math.min(Math.floor(y * scaleY), mask.height - 1);
      const maskIdx = maskY * mask.width + maskX;

      png.data[srcIdx] = rgbData[srcIdx];
      png.data[srcIdx + 1] = rgbData[srcIdx + 1];
      png.data[srcIdx + 2] = rgbData[srcIdx + 2];
      png.data[srcIdx + 3] = maskData[maskIdx];
    }
  }

  const outBuffer = PNG.sync.write(png);
  const outputPath = `public/images/${baseName}-cutout.png`;
  fs.writeFileSync(outputPath, outBuffer);
  console.log(`Saved ${outputPath} (${outBuffer.length} bytes) successfully!`);
}

async function run() {
  await processImage('portrait-sky.jpeg', 'portrait-sky');
  await processImage('portrait-blazer.png', 'portrait-blazer');
  console.log('All remaining cutouts completed!');
}

run().catch(console.error);
