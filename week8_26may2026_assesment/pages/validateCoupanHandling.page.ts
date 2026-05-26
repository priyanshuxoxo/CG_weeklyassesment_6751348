import { Locator, expect, Page } from '@playwright/test';
import couponCode from "../test-data/validInvalidCoupans.json"
import takeScreenShoot from '../utils/takeScreenshoot';


class CoupanHandling{

    page!:Page
    couponCodeBTN!:Locator
    couponCodeTF!:Locator
    couponApply!:Locator
    couponError!:Locator
    couponRemove!:Locator

    totalFare!:Locator
    discountPrice!:Locator

    constructor(page:Page){

        this.page=page;
        this.couponCodeBTN=page.locator(".listItem___9a15c0").first();
        this.couponCodeTF=page.getByRole("textbox",{name:"Coupon code"})
        this.couponApply=page.locator("[aria-label='Apply']")
        this.couponError=page.locator("#offer-error");

        this.couponRemove=page.locator("[aria-label='Remove']")

        this.totalFare=page.locator(".fare").first();
        this.discountPrice=page.locator(".discount___cc39f8 b")

        
    }

    async addValidCoupan(){

        await expect(this.couponCodeBTN).toBeAttached();
        await this.couponCodeBTN.click();
        await expect(this.couponCodeTF).toBeEditable()
        await this.couponCodeTF.fill(couponCode.validCoupan);
        await expect(this.couponApply).toBeVisible();
        await this.couponApply.click();

        await expect(this.couponError).toContainText("Congrats! You have availed a discount");

        


    }
    async validateFareAfterCouponApplied(){
        const discountValue=await this.discountPrice.innerText();
        const discountP=Number(discountValue.replace(/[^\d.]/g,''));
        console.log(discountP);
        
        const actualValue=await this.totalFare.innerText();
        const actVal=Number(actualValue.replace(/[^\d.]/g,''));
        const fareAfterCouponApplied=String(actVal-discountP);
        const finalValueText=await this.totalFare.innerText();
        const finalValue=finalValueText.replace(/[^\d.]/g,'');
        await takeScreenShoot(this.page,"valid coupon")
        expect(finalValue).toBe(fareAfterCouponApplied);

    }
    async applyInvalidCoupon(){

        await expect(this.couponRemove).toBeVisible();
        await this.couponRemove.click();
        await this.couponCodeTF.fill(couponCode.invalidCoupan);
        await this.couponApply.click();
        await expect(this.couponError).toHaveText("You are not a new customer.");
        await takeScreenShoot(this.page,"invalidCoupon");
    }
}
export default CoupanHandling;