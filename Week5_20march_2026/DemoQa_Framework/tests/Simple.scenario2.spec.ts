import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/RegisterUser.page"
import LoginUser from "../PageObjectModel/LoginUser.page";
import Urls from "../Utilities/Urls.json"
import ProfilePage from "../PageObjectModel/ProfilePage.page";

test("Simple Scenario 1",async({page})=>{
    let Register=new RegisterUser(page);
    let Login=new LoginUser(page);
    let Profile=new ProfilePage(page);
    await page.goto(Urls.mainUrl);
    await Register.RegisterUser();
    await Login.LoginUser();
    await Profile.accountDelete();
    await Profile.Logout();
    await Login.LoginUser();
})