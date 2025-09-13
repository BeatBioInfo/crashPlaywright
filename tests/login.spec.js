import { test, expect} from '@playwright/test';

test('should login with valid cred @smoke @regression', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[id="user-name"]').click()
    await page.locator('[id="user-name"]').fill('standard_user')
    await page.locator('[id="password"]').click()
    await page.locator('[id="password"]').fill('secret_sauce')
    await page.locator('[id="login-button"]').click()
    await page.goBack()
})
