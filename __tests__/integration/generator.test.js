import { BasePainter } from "../";
import puppeteer from "puppeteer";

describe("Tests Base painter functionality in the context of a react app", () => {
  let browser;
  let page;
  beforeAll(async () => {
    // launch the browser and create a new page
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    // close the browser
    await browser.close();
  });

  test("testing app starting", async () => {
    await page.goto("http://localhost:5173"); // vite default port
    const svg = await page.$("#root-svg");
    console.log(svg);
    const mySvg = new BasePainter(svg);
  });
});
