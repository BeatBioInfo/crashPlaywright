import {test, expect} from '@playwright/test'

import pomManager from '../pages/pomManager.js'

let pom

test.describe('login test', () =>{

    test.beforeEach(async ({page}) => {
         pom = new pomManager(page) 

        await pom.loginPage.navigate(); // calling this in the beforeEach hook makes the test maintainable and reusable

    })

   test.afterEach(async ({page}) => {

        await page.close()
    })

    test('login with valid credentials', async () => {
        // await pom.loginPage.navigate();

        await pom.loginPage.login('tomsmith', 'SuperSecretPassword!')

           // Assert value directly outside the test - in the secure page (this is cleaner)

        await pom.securePage.assertSecureLoggedInText('You logged into a secure area!')

    })

     test('login with wrong username', async () => {
        // await pom.loginPage.navigate();

        await pom.loginPage.login('invalidUser', 'SuperSecretPassword!')

        // Assert value directly in the test - this is straightforward

        const errorLoginMessage = await pom.loginPage.getErrorLoginMessage()
        expect(errorLoginMessage).toContain('Your username is invalid!')

        // await pom.loginPage.assertErrorMessageIsVisible('Your username is invalid!')
    })

        test('login with wrong password', async () => {
        // await pom.loginPage.navigate();

        await pom.loginPage.login('tomsmith', 'invalidPassword!')
        
        await pom.loginPage.assertErrorMessageIsVisible('Your password is invalid!')

    })

    
    


    

    
})
