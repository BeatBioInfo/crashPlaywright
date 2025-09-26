import {test, expect} from '@playwright/test'

import pomManager from '../pages/pomManager.js'

let pom

test.describe('checkbox assertion verification', () =>{

    test.beforeEach(async ({page}) => {
        pom = new pomManager(page) 
        await pom.checkBoxesPage.navigate(); // calling this in the beforeEach hook makes the test maintainable and reusable
    })

   test.afterEach(async ({page}) => {

        await page.close()
    })

    test('check and uncheck checkboxes', async () => {
        await pom.checkBoxesPage.checkCheckboxes(1)
        await pom.checkBoxesPage.assertCheckbox(1, true)

         await pom.checkBoxesPage.checkCheckboxes(2)
        await pom.checkBoxesPage.assertCheckbox(2, false)
    })

})