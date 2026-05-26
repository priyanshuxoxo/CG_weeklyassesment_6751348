import {test} from "@playwright/test"
import seatSelection from "../pages/Seat-selection-passenger-details.page"
import takeScreenShoot from "../utils/takeScreenshoot";

test("seatSelectionAndPassengerDetails",async({page})=>{
        
        let seatSel:seatSelection=new seatSelection(page);
        await seatSel.busSearchAndSelect();
        await seatSel.seatSelection();
        await seatSel.droppingAndBoardingPoints();
        await seatSel.contactDetails();
        await takeScreenShoot(page,"contactDetails");
        await seatSel.passengerDetails();
        await takeScreenShoot(page,"passengerDetails");
        await seatSel.confirmationPage();
        await takeScreenShoot(page,"confirmationPage");
})