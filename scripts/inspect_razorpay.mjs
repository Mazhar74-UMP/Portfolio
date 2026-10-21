import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--use-gl=angle']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const scripts = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('.js') && (url.includes('ai-builders') || url.includes('_next') || url.includes('chunk'))) {
      scripts.push(url);
    }
  });

  console.log('Navigating to https://razorpay.com/ai-builders/ ...');
  await page.goto('https://razorpay.com/ai-builders/', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await new Promise(r => setTimeout(r, 4000));

  // 1. Inspect Canvases and WebGL contexts
  const canvasInfo = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    return canvases.map(c => {
      let gl = c.getContext('webgl2') || c.getContext('webgl');
      let ctx2d = c.getContext('2d');
      const rect = c.getBoundingClientRect();
      return {
        width: c.width,
        height: c.height,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        className: c.className,
        id: c.id,
        parent: c.parentElement ? c.parentElement.tagName + '.' + c.parentElement.className : null,
        contextType: gl ? 'webgl' : (ctx2d ? '2d' : 'unknown')
      };
    });
  });
  console.log('Canvas Elements:', JSON.stringify(canvasInfo, null, 2));

  // 2. Inspect Images / Builders portraits
  const imagesInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => {
      const rect = img.getBoundingClientRect();
      return {
        src: img.src,
        alt: img.alt,
        className: img.className,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      };
    }).filter(i => i.rect.width > 50 && i.rect.height > 50);
  });
  console.log('Prominent Images:', JSON.stringify(imagesInfo.slice(0, 15), null, 2));

  // 3. Scroll down and test hover on images and interactive sections
  console.log('Scrolling page and testing hover interactions...');
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total document height:', scrollHeight);

  // Take screenshot of hero
  await page.screenshot({ path: 'razorpay-hero.png' });

  // Let's check for any ASCII / character / matrix / shader effects across script contents
  const matches = await page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    return {
      hasAscii: /ascii/i.test(html),
      hasMatrix: /matrix/i.test(html),
      hasShader: /shader|gl_FragColor/i.test(html),
      hasCharacterRamp: /@%#\*|\$@B%8&WM#/i.test(html)
    };
  });
  console.log('HTML Keywords Match:', matches);

  // Scroll through each section and inspect interactive elements
  for (let y = 0; y < Math.min(scrollHeight, 4000); y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise(r => setTimeout(r, 600));
  }

  await browser.close();
  console.log('Inspection complete.');
}

inspect().catch(console.error);
