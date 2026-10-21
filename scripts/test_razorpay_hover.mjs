import puppeteer from 'puppeteer-core';

async function testHover() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://razorpay.com/ai-builders/', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await new Promise(r => setTimeout(r, 4000));

  const canvasList = await page.$$('canvas');
  console.log(`Found ${canvasList.length} canvases.`);

  for (let i = 0; i < canvasList.length; i++) {
    const box = await canvasList[i].boundingBox();
    if (box && box.width > 100 && box.height > 100 && box.y > 0 && box.y < 900) {
      console.log(`Canvas ${i} box:`, box);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: `razorpay-hover-${i}.png` });
      console.log(`Saved razorpay-hover-${i}.png`);
      break;
    }
  }

  await browser.close();
}

testHover().catch(console.error);
