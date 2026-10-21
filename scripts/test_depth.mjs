import { pipeline, env } from '@xenova/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';

// Configure transformers
env.allowLocalModels = false;

async function run() {
  console.log('Testing Depth Estimation pipeline with Xenova/depth-anything-small-hf...');
  const depthEstimator = await pipeline('depth-estimation', 'Xenova/depth-anything-small-hf');
  console.log('Depth model loaded successfully!');

  const inputPath = 'public/images/portrait-main.jpeg';
  const result = await depthEstimator(inputPath);
  console.log('Depth estimation completed!');

  const depthRaw = result.depth;
  console.log('Depth dimensions:', depthRaw.width, depthRaw.height, depthRaw.channels);

  // Create grayscale PNG using pngjs
  const png = new PNG({
    width: depthRaw.width,
    height: depthRaw.height,
  });

  // depthRaw.data contains float or uint8 pixel values
  const data = depthRaw.data;
  console.log('Data length:', data.length, 'Data sample:', data[0], data[1], data[2]);

  // Fill RGBA buffer for PNG
  for (let y = 0; y < depthRaw.height; y++) {
    for (let x = 0; x < depthRaw.width; x++) {
      const srcIdx = y * depthRaw.width + x;
      const dstIdx = (y * depthRaw.width + x) * 4;
      const val = data[srcIdx];
      png.data[dstIdx] = val;     // R
      png.data[dstIdx + 1] = val; // G
      png.data[dstIdx + 2] = val; // B
      png.data[dstIdx + 3] = 255; // A
    }
  }

  const outBuffer = PNG.sync.write(png);
  fs.writeFileSync('public/images/portrait-main-depth.png', outBuffer);
  console.log('Saved public/images/portrait-main-depth.png successfully! Size:', outBuffer.length);
}

run().catch(err => {
  console.error('Error during depth estimation:', err);
});
