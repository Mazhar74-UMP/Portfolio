import { pipeline, env } from '@xenova/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';
import Jimp from 'jimp';

env.allowLocalModels = false;

async function run() {
  console.log('Testing image segmentation / background removal with Xenova/rmbg-1.4...');
  const segmenter = await pipeline('image-segmentation', 'Xenova/rmbg-1.4');
  console.log('RMBG model loaded successfully!');

  const inputPath = 'public/images/portrait-main.jpeg';
  const result = await segmenter(inputPath);
  console.log('Segmentation completed!');

  // result contains mask / output image
  console.log('Result keys:', Object.keys(result));
  if (result.mask) {
    console.log('Mask dimensions:', result.mask.width, result.mask.height);
  }

  // Load original image with Jimp
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log('Image dimensions:', width, height);

  // If result is RawImage with alpha channel or mask
  const output = result[0] || result;
  console.log('Output info:', output.width, output.height, output.channels);

  // Create transparent PNG using pngjs
  const png = new PNG({ width: output.width, height: output.height });
  for (let i = 0; i < output.data.length; i++) {
    png.data[i] = output.data[i];
  }

  const outBuffer = PNG.sync.write(png);
  fs.writeFileSync('public/images/portrait-main-cutout.png', outBuffer);
  console.log('Saved public/images/portrait-main-cutout.png successfully! Size:', outBuffer.length);
}

run().catch(err => {
  console.error('Error during cutout generation:', err);
});
