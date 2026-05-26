import { expect, Locator ,Page} from '@playwright/test';
import data from '../test-data/data.json';

class Auth{
    page!:Page
    accountBTN!:Locator
    loginBTN!:Locator
    mobileTF!:Locator
    continueBTN!:Locator

    constructor (page:Page){
        this.page=page;
        this.accountBTN=page.getByRole("button",{name:"Account"});
        this.loginBTN=page.getByRole("button",{name:"Log in"});
        this.mobileTF=page.locator("input[type='tel']");
        this.continueBTN=page.getByLabel("Continue");
    }

    async authentication(){
        await this.page.goto(data.baseUrl);
        await expect(this.accountBTN).toBeVisible();
        await this.accountBTN.click();
        await expect(this.loginBTN).toBeVisible();
        await this.loginBTN.click();
        await expect(this.mobileTF).toBeVisible();
        await this.mobileTF.fill(data.mobile);
        await expect(this.continueBTN).toBeEnabled();
        await this.continueBTN.click();
    }
}
export default Auth;    