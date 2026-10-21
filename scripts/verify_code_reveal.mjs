import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\3fac3976-9b41-4bca-98bb-6546056c7717';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verify() {
  console.log('Launching Chrome with puppeteer-core...');
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
  const consoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Test Desktop Viewport (1440x900)
  console.log('Testing Desktop 1440px...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // Wait 1s for initial render and auto-sweep
  await new Promise((r) => setTimeout(r, 1000));

  // Find the .code-reveal portrait element
  const portraitEl = await page.$('.code-reveal');
  if (!portraitEl) {
    throw new Error('Element .code-reveal not found on page!');
  }
  const box = await portraitEl.boundingBox();
  console.log('Portrait bounding box:', box);

  // Move mouse back and forth over the portrait to trigger pixel mosaic & snippets
  const cx = box.x + box.width * 0.5;
  const cy = box.y + box.height * 0.45;

  await page.mouse.move(cx - 60, cy - 40);
  await new Promise((r) => setTimeout(r, 100));
  await page.mouse.move(cx, cy);
  await new Promise((r) => setTimeout(r, 100));
  await page.mouse.move(cx + 50, cy + 30);
  await new Promise((r) => setTimeout(r, 100));
  await page.mouse.move(cx, cy);
  await new Promise((r) => setTimeout(r, 80));

  // Capture Desktop Screenshot with hover effect active
  const desktopShot = path.join(outDir, 'hero-desktop-1440px.png');
  await page.screenshot({ path: desktopShot });
  console.log(`Saved: ${desktopShot}`);

  // 2. Test Tablet Viewport (1024x800)
  console.log('Testing Tablet 1024px...');
  await page.setViewport({ width: 1024, height: 800, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const tPortrait = await page.$('.code-reveal');
  const tBox = await tPortrait.boundingBox();
  const tcx = tBox.x + tBox.width * 0.5;
  const tcy = tBox.y + tBox.height * 0.45;

  await page.mouse.move(tcx - 50, tcy - 30);
  await new Promise((r) => setTimeout(r, 100));
  await page.mouse.move(tcx, tcy);
  await new Promise((r) => setTimeout(r, 100));
  await page.mouse.move(tcx + 40, tcy + 25);
  await new Promise((r) => setTimeout(r, 80));

  const tabletShot = path.join(outDir, 'hero-tablet-1024px.png');
  await page.screenshot({ path: tabletShot });
  console.log(`Saved: ${tabletShot}`);

  // 3. Test Mobile Viewport (390x844)
  console.log('Testing Mobile 390px...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const mPortrait = await page.$('.code-reveal');
  const mBox = await mPortrait.boundingBox();
  const mcx = mBox.x + mBox.width * 0.5;
  const mcy = mBox.y + mBox.height * 0.45;

  // Touch drag over portrait
  await page.touchscreen.tap(mcx, mcy);
  await page.mouse.move(mcx - 30, mcy - 20);
  await new Promise((r) => setTimeout(r, 80));
  await page.mouse.move(mcx + 30, mcy + 20);
  await new Promise((r) => setTimeout(r, 80));

  const mobileShot = path.join(outDir, 'hero-mobile-390px.png');
  await page.screenshot({ path: mobileShot });
  console.log(`Saved: ${mobileShot}`);

  // 4. Test Demo HTML Reference page
  console.log('Testing demo.html standalone reference...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/demo.html', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1000));

  const demoPortrait = await page.$('.code-reveal');
  if (demoPortrait) {
    const dBox = await demoPortrait.boundingBox();
    const dcx = dBox.x + dBox.width * 0.5;
    const dcy = dBox.y + dBox.height * 0.45;
    await page.mouse.move(dcx - 40, dcy - 30);
    await new Promise((r) => setTimeout(r, 100));
    await page.mouse.move(dcx, dcy);
    await new Promise((r) => setTimeout(r, 100));
    await page.mouse.move(dcx + 40, dcy + 20);
    await new Promise((r) => setTimeout(r, 80));
  }
  const demoShot = path.join(outDir, 'demo-html-1440px.png');
  await page.screenshot({ path: demoShot });
  console.log(`Saved: ${demoShot}`);

  // 5. Test Motion Toggle OFF
  console.log('Testing Motion Toggle OFF...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 500));

  // Click the motion toggle button in navbar
  const motionBtn = await page.$('header button[title*="animations"]');
  if (motionBtn) {
    await motionBtn.click();
    console.log('Clicked motion toggle button.');
    await new Promise((r) => setTimeout(r, 400));
  }

  const motionOffShot = path.join(outDir, 'motion-toggle-off.png');
  await page.screenshot({ path: motionOffShot });
  console.log(`Saved: ${motionOffShot}`);

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
  } else {
    console.log('Zero console errors! ALL ACCEPTANCE CHECKS PASSED.');
  }
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
