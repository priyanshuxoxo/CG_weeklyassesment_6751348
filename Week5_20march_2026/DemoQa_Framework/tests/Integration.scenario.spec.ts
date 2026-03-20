import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/RegisterUser.page"
import LoginUser from "../PageObjectModel/LoginUser.page";
import Urls from "../Utilities/Urls.json"
import ValidateBookName from "../PageObjectModel/ValidateBooksName.page";
import ProfilePage from "../PageObjectModel/ProfilePage.page";

test("Integeration scenario",async({page})=>{
    let Register=new RegisterUser(page);
    let Login=new LoginUser(page);
    let BookNameValidate=new ValidateBookName(page);
    let Profile=new ProfilePage(page);
    await page.goto(Urls.mainUrl);
    await Register.RegisterUser();
    await Login.LoginUser();
    await BookNameValidate.VerifyBookName();
    await Profile.verifyUserName();
    await Profile.deleteAddedBooks();
    await Profile.bookStoreAdd();
    await Profile.verifyProfileAfterAddingBooks();
    await Profile.deleteAddedBooks();
    await Profile.bookStoreAdd();
    await Profile.allBookDelete();
    await Profile.Logout();
    await Login.LoginUser();
    await Profile.accountDelete();
})