import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\83036558-9b2c-4909-a1c3-82e4b23d7ff5';

async function capture() {
  console.log('Launching headless Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
    ],
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'hero-1440px', width: 1440, height: 900 },
    { name: 'hero-1024px', width: 1024, height: 800 },
    { name: 'hero-390px', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`Setting viewport ${vp.width}x${vp.height}...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto('http://localhost:3000/#', { waitUntil: 'networkidle0' });

    // Wait 2.5s for Three.js textures, shaders, and animations to stabilize
    await new Promise((r) => setTimeout(r, 2500));

    const outPath = `${outDir}\\${vp.name}.png`;
    await page.screenshot({ path: outPath });
    console.log(`Saved screenshot to ${outPath} (${fs.statSync(outPath).size} bytes)`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(console.error);
