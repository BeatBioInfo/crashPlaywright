import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe('testing assertions @assertions_group', () => {
    // beforeEach(() => {

    //     await page.goto('https://www.staging-student.mygeecs.com/')
    // })

    test('verify web page behavior - tohave @smoke', async ({page}) => {
        
        await page.goto('https://www.staging-student.mygeecs.com/')

        // assertion to have url
        await expect(page).toHaveURL('https://www.staging-student.mygeecs.com/')

        // to have title -- page title
        await expect(page).toHaveTitle('Student Portal | MYGEECS')

        // await expect(page).toHaveScreenshot()
    })

    test('verify web page - to assert a text is visible', async ({page}) => {

        await page.goto('https://www.saucedemo.com/')

        // assert visibility

        await expect(page.locator('[class="login_logo"]')).toBeVisible()

        // assert element to have text

        await expect(page.locator('[class="login_logo"]')).toHaveText('Swag Labs')

        // assert element contains text

        await expect(page.locator('body')).toContainText('secret_sauce')

    })

    test('assert the count & checkboxes', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // assert count
        await expect(page.locator('a')).toHaveCount(46)
        
        // assert the count by assigning a variable
        const list = page.locator('a');
            await expect(list).toHaveCount(46);

        // implicit and explicit wait
        await page.waitForTimeout(1000)

        await page.waitForLoadState('networkidle')


        // assert - to be checked
        await page.locator('[href="/checkboxes"]').click()

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/checkboxes')

        let checkbox = await page.getByRole('checkbox').nth(0)

        await checkbox.waitFor()


        await page.getByRole('checkbox').nth(0).check()

        await page.getByRole('checkbox').nth(1).uncheck()

        await expect(page.getByRole('checkbox').nth(0)).toBeChecked()

        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()

    })

    test('assert - have text', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/')

        await page.locator('[href="/login"]').click()

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/login')

        await expect(page.getByText('Login Page')).toBeVisible

        await page.locator('[name="username"]').fill('tomsmith')

        await expect(page.locator('[name="username"]')).toHaveValue('tomsmith')

        await page.locator('[type="password"]').fill('SuperSecretPassword!')

        await expect(page.locator('[type="password"]')).toHaveValue('SuperSecretPassword!')

        await expect(page.locator('[type="submit"]')).toBeEnabled()

        await page.locator('[type="submit"]').click()

        // verify the text stored in a variable
        const headertext = await page.locator('h2').textContent()

        expect(headertext).toBe(' Secure Area')






        
    })

})