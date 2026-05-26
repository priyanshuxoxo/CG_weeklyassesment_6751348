import {test} from "@playwright/test"
import Auth from '../pages/Auth,page';
import seatSelection from "../pages/Seat-selection-passenger-details.page"


test("Integration of Login and SeatBooking",async({page})=>{
    
    let Login:Auth=new Auth(page);
    let seatSel:seatSelection=new seatSelection(page);
    await Login.authentication();
        await seatSel.busSearchAndSelect();
        await seatSel.seatSelection();
        await seatSel.droppingAndBoardingPoints();
        await seatSel.contactDetails();
        await seatSel.passengerDetails();

})