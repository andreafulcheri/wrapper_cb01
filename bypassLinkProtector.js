var puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getStreamingLink(sitelink) {

  const browser = await puppeteer.launch({ headless: "new" });
  const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
  const page = await browser.newPage();
  await page.setUserAgent(ua);

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const page = await target.page();
      const url = page.url();
      if (url.search('stayonline') == -1 || url.search('mixdrop') == -1 || url.search('maxstream') == -1) {
        await page.close();
      }
    }
  });

  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(sitelink);

  const searchResultSelector = '#colButtons > button.btnClickToContinueLink.btn.btn-primary.btn-block.shadow.text-center.btn-lg.mb-1';

  while (page.url().includes('stayonline')) {
    console.log('iterating');
    try {
      var element = await page.waitForSelector(searchResultSelector);
      await sleep(1000);
      await element.click();
    } catch (e) {
      console.log(e.message);
      //break;
    }
    await sleep(1000);
    console.log('clicked');
  }
  var url = page.url();

  await browser.close();
  return url;
};

exports.getStreamingLink = getStreamingLink;


/*
test download
const token = url.split('/')[4];
console.log(token);

const url_download = 'https://mixdrop.co/f/' + token + "?download";
const selector2 = "body > div.container > div.panel.download > div > div.download-top.block > div > div.tbl-c.txt-r > div > a"
await page.goto(url_download);

 
var a1 = await page.waitForSelector(selector2);
await a1.click();
console.log('clicked a');
await sleep(1000);
await a1.click();
console.log('clicked a');
await sleep(1000);
await a1.click();
console.log('clicked a');
 
const elementHandles = await page.$$(selector2);
const propertyJsHandles = await Promise.all(
  elementHandles.map(handle => handle.getProperty('href'))
);
const hrefs2 = await Promise.all(
  propertyJsHandles.map(handle => handle.jsonValue())
);
console.log(hrefs2);
console.log(page.url()); */