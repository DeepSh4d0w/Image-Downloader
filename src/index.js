import puppeteer from "puppeteer";
import { ImageManager } from "./models/image.js";

const args = process.argv.splice(2, 3);

function getUrlFromArgs(arg) {
  return String(arg).split("=")[1];
}

const url = getUrlFromArgs(args[0]);
const urlName = String(url).split(".")[1];

const image = ImageManager();

const imageId = new Date().getTime();
const imageName = `${imageId}_${urlName}`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const imageTag = await page.waitForSelector("img");
  const imageSrc = await imageTag?.evaluate((element) => element.src);

  image.createImage(imageSrc, imageName);

  browser.close();
})();
