import { pipeline, env } from '@xenova/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';

env.allowLocalModels = false;

async function generateDepth(inputImage, outputName) {
  console.log(`\n--- Depth for ${inputImage} ---`);
  const depthEstimator = await pipeline('depth-estimation', 'Xenova/depth-anything-small-hf');
  const inputPath = `public/images/${inputImage}`;
  const result = await depthEstimator(inputPath);
  const depthRaw = result.depth;
  console.log(`Depth dimensions: ${depthRaw.width}x${depthRaw.height}`);

  const png = new PNG({ width: depthRaw.width, height: depthRaw.height });
  const data = depthRaw.data;

  for (let y = 0; y < depthRaw.height; y++) {
    for (let x = 0; x < depthRaw.width; x++) {
      const srcIdx = y * depthRaw.width + x;
      const dstIdx = (y * depthRaw.width + x) * 4;
      const val = data[srcIdx];
      png.data[dstIdx] = val;
      png.data[dstIdx + 1] = val;
      png.data[dstIdx + 2] = val;
      png.data[dstIdx + 3] = 255;
    }
  }

  const outBuffer = PNG.sync.write(png);
  const outputPath = `public/images/${outputName}`;
  fs.writeFileSync(outputPath, outBuffer);
  console.log(`Saved ${outputPath} (${outBuffer.length} bytes) successfully!`);
}

async function run() {
  await generateDepth('portrait-sky.jpeg', 'portrait-sky-depth.png');
  await generateDepth('portrait-blazer.png', 'portrait-blazer-depth.png');
  console.log('All depth maps generated!');
}

run().catch(console.error);
