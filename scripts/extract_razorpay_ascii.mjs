import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function extractAsciiCode() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const jsFiles = [];
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('.js')) {
      try {
        const text = await res.text();
        if (text.includes('Ascii') || text.includes('SlideCanvas') || text.includes('AsciiField')) {
          console.log('Found matching JS bundle:', url);
          fs.writeFileSync('razorpay-ascii-bundle.js', text);
        }
      } catch (e) {}
    }
  });

  await page.goto('https://razorpay.com/ai-builders/', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await new Promise(r => setTimeout(r, 5000));

  await browser.close();
}

extractAsciiCode().catch(console.error);
