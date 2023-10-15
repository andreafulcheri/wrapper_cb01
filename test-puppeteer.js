var puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://stayonline.pro/l/x024K/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  const initial = page.url();
  
  var i = 0;
  while (initial === page.url() || i < 3) {
    console.log("🚀 ~ file: test-puppeteer.js:19 ~ page.url():", page.url())
    const searchResultSelector = '#colButtons > button.btnClickToContinueLink.btn.btn-primary.btn-block.shadow.text-center.btn-lg.mb-1';
    const element = await page.waitForSelector(searchResultSelector);
    await page.screenshot({path: `./screenshots/${i}.png`});
    await element.click();
    console.log('clicked');
    await page.screenshot({path: `./screenshots/${i}_.png`});
    console.log("🚀 ~ file: test-puppeteer.js:22 ~ browser.pages():", (await browser.pages()).length)
    i++;
  }

  console.log(page.url());

  await browser.close();
})();