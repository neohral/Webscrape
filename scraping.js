const puppeteer = require('puppeteer');
const fs = require('fs');

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

const scrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: null
  });
  // Webサイトを開く
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // jsonを取得
  const pokemonurl = await page.evaluate((selector) => {
    return document.querySelector(selector).innerHTML;
  }, '#json-data');
  let jsonObject = JSON.parse(pokemonurl);
  //ファイル出力
  let filename = `poke_${pokeid}.json`
  fs.writeFile(`./pokemon/${filename}`, JSON.stringify(jsonObject, null, 3), (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log("complete");
  });
  browser.close();
}

//プログラムメイン
let pokeid = ('000' + getRandomInt(151)).slice(-3);
const url = `https://zukan.pokemon.co.jp/detail/${pokeid}`;
scrape(url);