import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/RegisterUser.page"
import LoginUser from "../PageObjectModel/LoginUser.page";
import Urls from "../Utilities/Urls.json"
import ValidateBookName from "../PageObjectModel/ValidateBooksName.page";
import ProfilePage from "../PageObjectModel/ProfilePage.page";

test("E2E Scenario",async({page})=>{
    let Register=new RegisterUser(page);
    let Login=new LoginUser(page);
    let Profile=new ProfilePage(page);
    let BookNameValidate=new ValidateBookName(page);
    await page.goto(Urls.mainUrl);
    await Register.RegisterUser();
    await Login.LoginUser();
    await Profile.bookStoreAdd();
    await Profile.Logout();
    await Login.LoginUser();
    await BookNameValidate.VerifyBookName();

})
