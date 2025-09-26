import { expect } from "@playwright/test";

import commonActions from "../utils/commonActions.js";

export default class SecurePage{
    constructor(page){
        this.actions = new commonActions(page)
        this.alertSelector = '[id="flash"]'
    }

    async getSecureLoginText(){
        return await this.actions.getText(this.alertSelector)
    }

    async assertSecureLoggedInText(successLoggedInMessage){
        const secureLoginText = await this.getSecureLoginText()

        expect(secureLoginText).toContain(successLoggedInMessage)

    }
}