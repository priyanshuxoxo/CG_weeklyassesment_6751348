import { test } from '@playwright/test';
import Auth from '../pages/Auth,page';
import seatSelection from "../pages/Seat-selection-passenger-details.page"
import CoupanHandling from '../pages/validateCoupanHandling.page';


test("From login to coupon applying",async ({page})=>{

    let Login:Auth=new Auth(page);
    let seatSel:seatSelection=new seatSelection(page);
    let coupon:CoupanHandling=new CoupanHandling(page);

    await Login.authentication();
        await seatSel.busSearchAndSelect();
        await seatSel.seatSelection();
        await seatSel.droppingAndBoardingPoints();
        await seatSel.contactDetails();
        await seatSel.passengerDetails();
        await seatSel.confirmationPage();
        await coupon.addValidCoupan();
        await coupon.validateFareAfterCouponApplied();
        await coupon.applyInvalidCoupon();



})