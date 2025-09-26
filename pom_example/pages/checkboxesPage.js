import { expect, selectors } from "@playwright/test";

import commonActions from "../utils/commonActions.js";

export default class CheckBoxesPage{
    constructor(page) {
        this.actions = new commonActions(page)
        // this.checkCheckboxSelector = `input[type="checkbox"]:nth-of-type(${index})`
    }

    async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/checkboxes')
    }

    async checkCheckboxes(index){
        await this.actions.click(`input[type="checkbox"]:nth-of-type(${index})`)
    }

    async isItChecked(index){
        return await this.actions.isChecked(`input[type="checkbox"]:nth-of-type(${index})`)
    }

    async assertCheckbox(index, expectedChecked){
        const isChecked = await this.isItChecked(index)
        expect(isChecked).toBe(expectedChecked)
    }

}