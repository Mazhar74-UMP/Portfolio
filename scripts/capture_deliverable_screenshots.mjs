import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\3fac3976-9b41-4bca-98bb-6546056c7717';

async function captureAll() {
  console.log('Launching headless Chrome for deliverable screenshots...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // ==========================================
  // 1. DESKTOP 1440px VIEWPORT
  // ==========================================
  console.log('\n--- Capturing Desktop (1440px) States ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Find portrait element
  const portraitEl = await page.$('div.cursor-crosshair');
  if (!portraitEl) throw new Error('Portrait element div.cursor-crosshair not found!');
  const box = await portraitEl.boundingBox();
  console.log('Portrait box:', box);

  const cx = box.x + box.width * 0.5;
  const cy = box.y + box.height * 0.45;

  // State 1: Normal photo (cursor far outside)
  await page.mouse.move(50, 50);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'desktop-1-normal.png') });
  console.log('Captured: desktop-1-normal.png');

  // State 2: Mid-transition (cursor moves into center of face, wait 140ms for expanding wave)
  await page.mouse.move(cx, cy);
  await new Promise(r => setTimeout(r, 160));
  await page.screenshot({ path: path.join(outDir, 'desktop-2-mid-transition.png') });
  console.log('Captured: desktop-2-mid-transition.png');

  // State 3: Fully converted (hold for 750ms so wave fully covers whole person)
  await new Promise(r => setTimeout(r, 650));
  // Small jitter to trigger live flicker and radial glow
  await page.mouse.move(cx + 4, cy - 3);
  await new Promise(r => setTimeout(r, 50));
  await page.screenshot({ path: path.join(outDir, 'desktop-3-fully-converted.png') });
  console.log('Captured: desktop-3-fully-converted.png');

  // State 4: After cursor leaves (move mouse outside, wait 900ms for smooth return to normal photo)
  await page.mouse.move(100, 100);
  await new Promise(r => setTimeout(r, 950));
  await page.screenshot({ path: path.join(outDir, 'desktop-4-after-leave.png') });
  console.log('Captured: desktop-4-after-leave.png');


  // ==========================================
  // 2. MOBILE 390px VIEWPORT
  // ==========================================
  console.log('\n--- Capturing Mobile (390px) States ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  const mPortrait = await page.$('div.cursor-crosshair');
  const mBox = await mPortrait.boundingBox();
  console.log('Mobile portrait box:', mBox);
  const mcx = mBox.x + mBox.width * 0.5;
  const mcy = mBox.y + mBox.height * 0.42;

  // State 1: Normal photo (untouched)
  await page.screenshot({ path: path.join(outDir, 'mobile-1-normal.png') });
  console.log('Captured: mobile-1-normal.png');

  // State 2: Mid-transition (touch tap to start wave, wait 150ms)
  await page.touchscreen.tap(mcx, mcy);
  await new Promise(r => setTimeout(r, 160));
  await page.screenshot({ path: path.join(outDir, 'mobile-2-mid-transition.png') });
  console.log('Captured: mobile-2-mid-transition.png');

  // State 3: Fully converted (hold for 700ms)
  await new Promise(r => setTimeout(r, 650));
  await page.screenshot({ path: path.join(outDir, 'mobile-3-fully-converted.png') });
  console.log('Captured: mobile-3-fully-converted.png');

  // State 4: After tap leaves / toggles off (tap to deactivate, wait 900ms)
  await page.touchscreen.tap(mcx, mcy);
  await new Promise(r => setTimeout(r, 950));
  await page.screenshot({ path: path.join(outDir, 'mobile-4-after-leave.png') });
  console.log('Captured: mobile-4-after-leave.png');

  await browser.close();
  console.log('\nAll 8 deliverable screenshots captured successfully!');
}

captureAll().catch(console.error);
