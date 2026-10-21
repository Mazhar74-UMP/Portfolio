import { pipeline, RawImage } from '@huggingface/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';
import sharp from 'sharp';

async function decontaminate() {
  console.log('Reading portrait-main.jpeg...');
  const inputPath = 'public/images/portrait-main.jpeg';
  const origImg = await RawImage.read(inputPath);
  const { width, height } = origImg;
  console.log(`Original dimensions: ${width}x${height}`);

  console.log('Loading BiRefNet segmenter...');
  const segmenter = await pipeline('image-segmentation', 'onnx-community/BiRefNet-portrait-ONNX');
  console.log('Segmenting...');
  const result = await segmenter(origImg);
  const mask = result[0]?.mask || result.mask || result;

  const rgbImg = origImg.channels === 4 ? origImg : origImg.rgba();
  const png = new PNG({ width, height });
  const maskData = mask.data;
  const rgbData = rgbImg.data;

  // Background color estimated from portrait studio background
  const bgR = 214;
  const bgG = 214;
  const bgB = 214;

  const scaleX = mask.width / width;
  const scaleY = mask.height / height;

  // Bottom fade start (bottom 28% fades smoothly to 0)
  const bottomFadeStartY = height * 0.72;

  for (let y = 0; y < height; y++) {
    // Bottom gradient multiplier
    let bottomAlphaMul = 1.0;
    if (y > bottomFadeStartY) {
      const progress = (y - bottomFadeStartY) / (height - bottomFadeStartY);
      // Cosine / smoothstep curve
      bottomAlphaMul = Math.max(0, 1.0 - progress * progress);
    }

    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const maskX = Math.min(Math.floor(x * scaleX), mask.width - 1);
      const maskY = Math.min(Math.floor(y * scaleY), mask.height - 1);
      const maskIdx = maskY * mask.width + maskX;

      let a = maskData[maskIdx] / 255.0;

      // Clean cutoff for background noise
      if (a < 0.03) {
        png.data[srcIdx] = 0;
        png.data[srcIdx + 1] = 0;
        png.data[srcIdx + 2] = 0;
        png.data[srcIdx + 3] = 0;
        continue;
      }

      // Observed color
      let r = rgbData[srcIdx];
      let g = rgbData[srcIdx + 1];
      let b = rgbData[srcIdx + 2];

      // Alpha Decontamination: strip light grey background bleed from edge pixels
      if (a < 0.98) {
        const invA = 1.0 - a;
        // True foreground estimate: (C_obs - invA * C_bg) / a
        let trueR = (r - invA * bgR) / a;
        let trueG = (g - invA * bgG) / a;
        let trueB = (b - invA * bgB) / a;

        // Clamp to valid range
        trueR = Math.max(0, Math.min(255, trueR));
        trueG = Math.max(0, Math.min(255, trueG));
        trueB = Math.max(0, Math.min(255, trueB));

        // For edge pixels (hair & perimeter), blend towards dark tone so no white/grey fringe can show
        const fringeCleanFactor = Math.pow(1.0 - a, 1.5);
        r = Math.round(trueR * (1.0 - fringeCleanFactor * 0.7));
        g = Math.round(trueG * (1.0 - fringeCleanFactor * 0.7));
        b = Math.round(trueB * (1.0 - fringeCleanFactor * 0.7));
      }

      // Apply bottom fade
      const finalA = Math.round(Math.min(255, Math.max(0, a * bottomAlphaMul * 255.0)));

      png.data[srcIdx] = r;
      png.data[srcIdx + 1] = g;
      png.data[srcIdx + 2] = b;
      png.data[srcIdx + 3] = finalA;
    }
  }

  const outBuffer = PNG.sync.write(png);
  fs.writeFileSync('public/images/portrait-main-cutout.png', outBuffer);
  console.log(`Saved public/images/portrait-main-cutout.png (${outBuffer.length} bytes)`);

  // Also encode high-quality WebP
  await sharp(outBuffer)
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile('public/images/portrait-main-cutout.webp');
  console.log('Saved public/images/portrait-main-cutout.webp successfully!');
}

decontaminate().catch(console.error);
