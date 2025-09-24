import { test, expect } from "@playwright/test";

import { chromium } from "playwright";

let browser;

let context;

let page;

test.describe("describe block for hooks", async () => {
  test.beforeAll(async () => {
    //launch browser before test
    browser = await chromium.launch({ headless: true });
    console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER");
  });

  test.beforeEach(async () => {
    //create context for browser

    context = await browser.newContext();

    // create new page

    page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/");
    console.log("BEFORE EACH LAUNCHED NEW PAGE");
  });

  test.afterEach(async () => {
    //close page
    await page.close();

    await context.close();
    console.log("AFTER EACH CLOSED PAGE");
  });

  test.afterAll(async () => {
    //close page
    await browser.close();
    console.log("AFTER All HOOK CLOSED BROWSER");
  });

  test("login test", async () => {
    await page.click('[href="/abtest"]');

    const header = await page.textContent("h3");
    await page.pause();
    expect(header).toBe("A/B Test Control");
  });

  test("check for checkboxes", async () => {
    await page.click('[href="/checkboxes"]');

    const checkbox = await page.isChecked('input[type="checkbox"]:first-child');

    expect(checkbox).toBeFalsy();
  });

  test("Geolocation settings in context", async () => {
    // this settings overrides the initial config for browser
    context = await browser.newContext({
      Permissions: ["geolocation"],
      geolocation: { latitude: 55.755826, longitude: 37.6173 },
      viewport: { width: 1280, height: 720 },
    });

    page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/geolocation");

    await page.click("button");

    const lat = await page.textContent('[id="lat-value"]');

    const long = await page.textContent("#long-value");

    expect(parseFloat(lat)).toBeCloseTo(55.755826);

    expect(parseFloat(long)).toBeCloseTo(37.6173);
  });
});
