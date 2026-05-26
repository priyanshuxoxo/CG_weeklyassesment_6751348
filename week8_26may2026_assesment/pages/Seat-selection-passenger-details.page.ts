import {expect,Locator,Page} from "@playwright/test"
import BusSearchAndFilter from './BusSearch-filter.page';
import passengerDetails from '../test-data/passenger.data.json'
import { lookup } from "dns";
import takeScreenShoot from "../utils/takeScreenshoot";

class SeatSelectionAndPassengerDeatails{
    page!:Page
    selectBus!:Locator
    seatSelect!:Locator
    selectBoardingAndDrop!:Locator
    boardingLocation!:Locator
    droppingLocation!:Locator


    contactEditBTN!:Locator
    phoneNumber!:Locator
    contactEmail!:Locator
    stateOfResidence!:Locator
    stateOfResidenceSearch!:Locator
    selectStateOfResidence!:Locator


    addPassengerBTN!:Locator
    addToPassengerList!:Locator
    passengerName!:Locator
    passengerAge!:Locator
    passengerGender!:Locator
    insurrance!:Locator
    cancellation!:Locator
    continueBTN!:Locator
    fillPassengerDetailsBTN!:Locator


    constructor(page:Page){

        this.page=page
        this.selectBus=this.page.getByRole("button",{name:"View seats"}).first();
        this.seatSelect=this.page.locator('[aria-label*="seat status available"]');



        this.selectBoardingAndDrop=this.page.getByLabel("Select boarding & dropping points");
        this.boardingLocation= this.page.locator(
        '[role="radio"][aria-label*="TRANSPORT NAGAR"]');
        this.droppingLocation=this.page.locator(
        '[role="radio"][aria-label*="Alambagh Neharia Chourah"]');
        this.fillPassengerDetailsBTN=this.page.getByLabel("Fill passenger details");

        this.addPassengerBTN=page.getByRole("button",{name:"Add Passenger"})
        this.addToPassengerList=page.getByLabel("Add to passengers list")



        this.contactEditBTN=page.locator("[aria-label='Edit']")
        this.contactEmail=this.page.getByPlaceholder("Enter email id");
        this.phoneNumber=this.page.getByPlaceholder("Phone");
        this.stateOfResidence=this.page.locator(".inputBox___5e7fb8");
        this.stateOfResidenceSearch=this.page.getByPlaceholder("Search for state");
        this.selectStateOfResidence=this.page.locator(".listItem___06cf49")




        this.passengerName=this.page.getByLabel("Name *");
        this.passengerAge=this.page.getByLabel("Age *");
        this.passengerGender=page.getByLabel(passengerDetails.Gender,{exact:true})

        this.cancellation=page.getByLabel("Don't add Free Cancellation")
        this.insurrance=page.locator(".insuranceChoiceLbl___6e24f5").last();
        this.continueBTN=this.page.getByRole("button",{name:"Continue booking"});
    }


    async busSearchAndSelect(){
        let BusSearch:BusSearchAndFilter=new BusSearchAndFilter(this.page);
        await BusSearch.searchBus();
        await expect(this.selectBus).toBeEnabled();
        await this.selectBus.click();
    }
    async seatSelection(){

        await expect(this.seatSelect.first()).toBeAttached();
        await this.seatSelect.first().click();
        
    }
    async droppingAndBoardingPoints(){
        await this.selectBoardingAndDrop.click();
        // await expect(this.boardingLocation).toBeVisible();
        // await this.boardingLocation.click();
        // await expect(this.droppingLocation).toBeVisible();
        // await this.droppingLocation.click();
        await this.fillPassengerDetailsBTN.click();
        
    }

    async contactDetails(){
        await this.contactEditBTN.click();
        await expect(this.phoneNumber).toBeEditable();
        await this.phoneNumber.fill(passengerDetails.mobile);
        await expect(this.contactEmail).toBeEnabled();
        await this.contactEmail.fill(passengerDetails.emailId);
        await expect(this.stateOfResidence).toBeVisible();
        await this.stateOfResidence.click();
        await expect(this.stateOfResidenceSearch).toBeVisible();
        await this.stateOfResidenceSearch.fill(passengerDetails.stateOfResidence)
        await expect(this.selectStateOfResidence).toBeVisible();
        await this.selectStateOfResidence.click();

    }

    async passengerDetails(){

        await this.addPassengerBTN.click();
        await expect(this.passengerName).toBeEditable();
        await this.passengerName.fill(passengerDetails.Name);
        await expect(this.passengerAge).toBeEditable();
        await this.passengerAge.fill(passengerDetails.Age);
        await expect(this.passengerGender).toBeVisible();
        await this.passengerGender.check();
        await this.addToPassengerList.click();
        await this.cancellation.click();
        await expect(this.insurrance).toBeVisible();
        await this.insurrance.click();
        await expect(this.continueBTN).toBeEnabled();
        await this.continueBTN.click();

    }

    async confirmationPage(){
        await takeScreenShoot(this.page,"ConfirmationPaymentPage");
    }

}
export default SeatSelectionAndPassengerDeatails;