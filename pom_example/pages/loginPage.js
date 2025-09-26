import { expect } from "@playwright/test";

import commonActions from "../utils/commonActions.js";

export default class LoginPage{
    constructor(page){
        this.actions = new commonActions(page)
        this.usernameSelector = '#username'
        this.alertSelector = '[id="flash"]'

    }

    async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/login')
    }

    async login(username, password){
        await this.actions.fill(this.usernameSelector, username)

        await this.actions.fill('#password', password)

        await this.actions.click('button[type="submit"]')
    }
    
      async getErrorLoginMessage(){
        return await this.actions.getText(this.alertSelector)
    }

    async assertErrorMessageIsVisible(errorLoginMessage){
        const errorLoginText = await this.getErrorLoginMessage()

        expect(errorLoginText).toContain(errorLoginMessage)

    }
}