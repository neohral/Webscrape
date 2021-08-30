const puppeteer = require('puppeteer');
const fs = require('fs');

//乱数生成
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
  //JSON形式に変換
  let jsonObject = JSON.parse(pokemonurl);
  //出力ファイル名
  let filename = `poke_${pokeid}.json`
  //ファイル出力
  fs.writeFile(`./pokemon/${filename}`, JSON.stringify(jsonObject, null, 3), (err) => {
    if (err) {
      //エラー時
      console.error(err);
      return;
    };
    //完了時
    console.log("complete");
  });
  //ブラウザを閉じる
  browser.close();
}

//プログラムメイン
let pokeid = ('000' + getRandomInt(151)).slice(-3);
const url = `https://zukan.pokemon.co.jp/detail/${pokeid}`;
scrape(url);