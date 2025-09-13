import {test, expect} from '@playwright/test';

import { chromium } from '@playwright/test';

let browser;

let context;

let page;

test.beforeAll(async () => {
    //launch browser before test
    browser = await (chromium.launch())
    console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER")
    
})

test.beforeEach(async ()=> {
    //create context for browser

    context = await browser.newContext();

    // create new page

    page = await context.newPage()
})
