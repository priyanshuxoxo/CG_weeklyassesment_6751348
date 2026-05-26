import { Locator, expect, Page } from '@playwright/test';
import  data  from '../test-data/data.json';
import helper from "../utils/helper"
import takeScreenShoot from '../utils/takeScreenshoot';


class BusSearchAndFilter{

    /**
     * variables for searchpage locators
     */

    page!:Page
    sourceCity!:Locator
    sourceCityInp!:Locator
    destCity!:Locator
    trvlDate!:Locator
    searchBtn!:Locator
    trvlMonth!:Locator
    trvlDay!:Locator
    trvlArrow!:Locator


    /**
     * variables for filter page locator
     */
    coolingType!:Locator
    windowType!:Locator
    busRating!:Locator
    busAmentities!:Locator
    busAmentitiesType!:Locator


    /**
     * variables for sorting page locator
     */

    busSort!:Locator


    /**
     * constructor to initialize the POM page
     */
    
    constructor (page:Page){

        this.page=page;
        /**
         * search buses
         */
        this.sourceCity=page.locator(".srcDestWrapper___fe1a27").first();
        this.sourceCityInp=page.locator("#srcinput")
        this.destCity=page.locator("#destinput");
        this.trvlDate=page.getByRole("combobox",{name:"Select Date of Journey."})
        this.searchBtn=page.getByRole("button",{name:"Search buses"});
        this.trvlMonth=page.locator(".monthYear___2b924f");
        this.trvlArrow=page.locator(".icon.icon-arrow.arrow___2dd861.right___841620")

        /**
         * filters
         */
        this.coolingType=page.getByRole("button",{name:new RegExp(`^${data.busType}\\s*\\(`,'i')});
        this.windowType=page.getByRole("button",{name:new RegExp(`^${data.window}\\s*\\(`,'i')})
        this.busRating=page.getByRole("button",{name:new RegExp(data.rating,'i')});
        this.busAmentities=page.getByRole("button",{name:"Amenities",exact:true});
        this.busAmentitiesType=page.getByRole("checkbox",{name:new RegExp(data.Amentities,'i')});

        /**
         * sorting
         */

        this.busSort=page.getByRole("radio",{name:"Price"});
    }

    /**
     * method to find the buses with given soruce and destination city
     */

    async searchBus():Promise<void>{
        await this.page.goto(data.baseUrl)
        await expect(this.sourceCity).toBeVisible();
        await this.sourceCity.click();
        await this.sourceCityInp.fill(data.sourceCity);
        await this.page.getByRole("heading",{name:"Jaipur (Rajasthan)"}).first().click();
        await expect(this.destCity).toBeVisible();
        await this.destCity.fill(data.destinationCity);
        await this.page.getByRole("heading",{name:"Lucknow"}).first().click();
        await this.trvlDate.click();
        await helper.selectDate(this.trvlMonth,this.trvlArrow,this.page);
        await expect(this.searchBtn).toBeEnabled();
        await this.searchBtn.click();
        // await takeScreenShoot(this.page,"searchedBuses");
    }
    
    /**
     * this method apply the desired filters on the list of buses available between the given source and destination and also verify the filters are applied succesfully
     */
    async filterBuses():Promise<void>{

        await expect(this.coolingType).toBeVisible();
        await this.coolingType.click();
        await expect(this.windowType).toBeVisible();
        await this.windowType.click();
        await expect(this.busRating).toBeVisible();
        await this.busRating.click();
        await expect(this.busAmentities).toBeVisible();
        await this.busAmentities.click();
        await expect(this.busAmentitiesType).toBeVisible();
        await this.busAmentitiesType.click();
        await takeScreenShoot(this.page,"filteredBuses");
    }

    /**
     * this method is used to apply desired sorting on to the buses and also to verify
     */
    async sortBuses():Promise<void>{
        await expect(this.busSort).toBeVisible();
        await this.busSort.click();
        await takeScreenShoot(this.page,"sortBuses")
    }
}

export default BusSearchAndFilter;