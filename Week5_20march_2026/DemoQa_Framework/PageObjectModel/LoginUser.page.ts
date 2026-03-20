import { expect, Locator, Page } from "@playwright/test";
import LoginUserData from "../Utilities/LoginUserData.json";
class LoginUser{
    UserNameTF!:Locator;
    PasswordTF!:Locator;
    LoginBTN!:Locator;
    constructor(page:Page){
        this.UserNameTF=page.getByPlaceholder("UserName");
        this.PasswordTF=page.getByPlaceholder("Password");
        this.LoginBTN=page.locator("#login");

    }

    async LoginUser(){
        
        await this.UserNameTF.fill(LoginUserData.userName);
        await this.PasswordTF.fill(LoginUserData.password);
        await this.LoginBTN.click();
    }
}
export default LoginUser;