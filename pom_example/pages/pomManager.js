import LoginPage from "./loginPage.js";
import SecurePage from "./securePage.js";
import CheckBoxesPage from "./checkboxesPage.js";

export default class pomManager {
    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(page)
        this.securePage = new SecurePage(page)
        this.checkBoxesPage = new CheckBoxesPage(page)
    }
}