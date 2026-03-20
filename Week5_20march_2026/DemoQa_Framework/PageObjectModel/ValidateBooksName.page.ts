import { expect, Locator, Page } from "@playwright/test";
import BooksName from "../Utilities/BooksName.json"

class ValidateBookName{
    bookStoreBTN!:Locator;
    searchBarTF!:Locator;
    bookLocator!:Locator;
    constructor(page:Page){
        this.bookStoreBTN=page.locator("//a[@href='/books']");
        this.searchBarTF=page.getByPlaceholder("Type to search");
        this.bookLocator=page.locator("//div[@class='action-buttons']/span/a")
    }

    async VerifyBookName(){
        await this.bookStoreBTN.click();
        for(let d of BooksName){
            await this.searchBarTF.fill(d.name);
            await expect(this.bookLocator).toHaveText(d.name);
        }
    }
}
export default ValidateBookName;