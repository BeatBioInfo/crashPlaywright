import { test, expect} from '@playwright/test'

test('test the clickMe page @smoke @regression', async ({page}) => {

    //navigate to the clickMePage LiveServer

    await page.goto('http://127.0.0.1:5500/clickMe.html')

    // Select by ID
    await page.locator('#clickButton').click()

    // select by class

    await page.locator('.button-style').click()

    // select by tag and class
    await page.locator('button.button-style').click()

    // select by attribute value
    await page.locator('[data-action="increment"]').click()

    await page.locator('[data-testid="clickButton"]').click()

    await page.locator('[class="button-style"]').click()

    // select by partial atrribute
    await page.locator('[role*="but"]').click()

    // select by Text content
    await page.locator('text=CLICK ME').click()

    // select by combining selectors for precision, class & text - find exact match

    await page.locator('.button-style:text("CLICK ME")').click()

    // find elements containing specific text - has-text

    await page.locator('button:has-text("CLick m")').click()

    // Attribute and text combination
    await page.locator('[data-testid="clickButton"]:text("CLICK ME")').click()

    // selector using playwright recommended 
    
    // get by text using playwright
    await page.getByText('CLICK ME').click()

    // get by data-test id
    await page.getByTestId('clickButton').click()

    // get by role
    await page.getByRole('button', {name: /click me/i }).click()

    // assert the counter

    await expect(page.locator('[id="counter"]')).toContainText('14')

})