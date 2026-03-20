import { expect, Locator, Page } from "@playwright/test";
import userData from "../Utilities/LoginUserData.json"
import bookAddData from "../Utilities/BooksToAdd.json"
class ProfilePage{
    page:Page
    userName!:Locator
    goToBookStoreBTN!:Locator
    deleteAcoountBTN!:Locator
    deleteAllBooksBTN!:Locator
    logoutBTN!:Locator
    booksToAdd!:Locator
    addToCollection!:Locator
    backToBookStore!:Locator
    bookStoreBTN!:Locator
    afterAddBookValidation!:Locator
    deleteAddBooks!:Locator
    deleteBookModalAccept!:Locator
    modalButtonCross!:Locator
    profile!:Locator
    deleteAccountBTN!:Locator
    backToLoginAfterDeleteAccount!:Locator

    constructor(page:Page){
        this.page=page
        this.userName=page.locator("#userName-value");
        this.goToBookStoreBTN=page.locator("#gotoStore");
        this.addToCollection=page.locator("//div[@class='text-right fullButton']/button[@id='addNewRecordButton']")
        this.backToBookStore=page.locator("//div[@class='text-left fullButton']/button[@id='addNewRecordButton']")
        this.bookStoreBTN=page.locator("//a[@href='/books']");
        this.deleteBookModalAccept=page.locator("//button[@id='closeSmallModal-ok']");
        this.modalButtonCross=page.locator("//div[@class='modal-header']/button[@class='btn-close']")
        this.profile=page.locator("//a[@href='/profile']")
        this.logoutBTN=page.getByRole("button",{name:/(Log ?out)/i});
        this.deleteAccountBTN=page.locator("//button[@id='submit' and .='Delete Account']")
        this.backToLoginAfterDeleteAccount=page.locator("//a[@href='/login']")
        this.deleteAllBooksBTN=page.getByRole("button",{name:"Delete All Books"})
    }

    async verifyUserName(){
        await expect(this.userName).toHaveText(userData.userName);
    }
    async bookStoreAdd() {
        await this.profile.click();
        await this.goToBookStoreBTN.click();
        const book = this.page.getByRole('link', { name: bookAddData.name });
        await book.click();
        await Promise.all([
            this.page.waitForEvent('dialog').then(async (dialog) => {
                const msg = dialog.message();
                console.log(msg);
            expect(
                msg.includes("Book added to your collection.") ||
                msg.includes("Book already present in the your collection!")
            ).toBeTruthy();
            return dialog.accept().catch(() => {});
            }),
            this.addToCollection.click()
        ]);

        await expect(this.backToBookStore).toBeVisible();
        await this.backToBookStore.click();
} 
    async verifyProfileAfterAddingBooks(){
            await this.profile.click();
            this.afterAddBookValidation=this.page.locator("//div[@class='action-buttons']/span/a",{hasText:bookAddData.name})
            await expect(this.afterAddBookValidation.first()).toContainText(bookAddData.name);
          
    }
   async deleteAddedBooks() {
    this.deleteAddBooks = this.page.locator(
        "//div[@class='action-buttons']/span[@title='Delete']"
    );

    const count = await this.deleteAddBooks.count();

    for (let i = 0; i < count; i++) {
        await this.deleteAddBooks.first().click();

        await Promise.all([
            this.page.waitForEvent('dialog').then(async (dialog) => {
                console.log(dialog.message());
                expect(dialog.message()).toContain("Book deleted.");
                return dialog.accept().catch(() => {});
            }),
            this.deleteBookModalAccept.click()
        ]);
    }
}
    async allBookDelete(){
        await this.profile.click();
        await expect(this.deleteAllBooksBTN).toBeVisible()
        await this.deleteAllBooksBTN.click();
        await expect(this.deleteBookModalAccept).toBeVisible();
        await this.deleteBookModalAccept.click();
        await expect(this.modalButtonCross).toBeVisible()
        await this.modalButtonCross.click();
        await this.page.goBack();
        await expect(this.profile).toBeVisible();
        await this.profile.click();
    }

    async Logout(){
        await expect(this.logoutBTN).toBeVisible()
        await this.logoutBTN.click();
    }
    async accountDelete(){
        await expect(this.deleteAccountBTN).toBeVisible();
        await this.deleteAccountBTN.click();
        await expect(this.deleteBookModalAccept).toBeVisible()
        await this.deleteBookModalAccept.click();
        await expect(this.modalButtonCross).toBeVisible();
        await this.modalButtonCross.click();
        await expect(this.backToLoginAfterDeleteAccount).toBeVisible();
        await this.backToLoginAfterDeleteAccount.click();
    }
}

export default ProfilePage;