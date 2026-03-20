import { expect, Locator, Page } from "@playwright/test";
import RegisterUserData from "../Utilities/RegisterUserData.json";
class RegisterUser{
    page:Page;
    FirstNameTF!:Locator;
    LastNameTF!:Locator;
    UserNameTF!:Locator;
    PasswordTF!:Locator;
    RegisterBTN!:Locator;
    BackToLoginBTN!:Locator;
    newUserBTN!:Locator;
    bookStoreApplicationLNK!:Locator;
    loginBTN!:Locator;

    constructor(page:Page){
        this.page=page
        this.FirstNameTF=page.getByPlaceholder("First Name");
        this.LastNameTF=page.getByPlaceholder("Last Name");
        this.UserNameTF=page.getByPlaceholder("UserName");
        this.PasswordTF=page.getByPlaceholder("Password");
        this.RegisterBTN=page.getByRole("button",{name:"Register"});
        this.BackToLoginBTN=page.getByRole("button",{name:"Back to Login"});
        this.newUserBTN=page.locator("#newUser");
        this.bookStoreApplicationLNK=page.locator("//h5[text()='Book Store Application']");
        this.loginBTN=page.locator("//a[@href='/login']");
    }
    async RegisterUser(){
        await this.bookStoreApplicationLNK.click();
        await this.loginBTN.click();
        await this.newUserBTN.click();
        await this.FirstNameTF.fill(RegisterUserData.firstName,);
        await expect(this.FirstNameTF).toHaveValue(RegisterUserData.firstName);
        await this.LastNameTF.fill(RegisterUserData.lastName);
        await expect(this.LastNameTF).toHaveValue(RegisterUserData.lastName);
        await this.UserNameTF.fill(RegisterUserData.userName);
        await expect(this.UserNameTF).toHaveValue(RegisterUserData.userName);
        await this.PasswordTF.fill(RegisterUserData.password);
        await expect(this.PasswordTF).toHaveValue(RegisterUserData.password);
        this.page.once("dialog",async(dialog)=>{
            // expect(dialog.message()).toContain("User Registered Successfully.");
            console.log(dialog.message());
            await dialog.accept();
            
        })
        await this.RegisterBTN.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.BackToLoginBTN.click();
    }

}
export default RegisterUser;