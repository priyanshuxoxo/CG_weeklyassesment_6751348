
import {Locator, Page } from '@playwright/test';
import data from "../test-data/data.json"

/**
 * this method is used to segeregate the date from the json file into months, day and year
 */

const getDate=():string[]=>{
    const [day,month,year]:string[]=data.travelDate.split("/");
    const Months:string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const targetMonth:string=Months[Number(month)-1];
    return [targetMonth,year,day];

}

/**
 * this method is used to select the correct date on date picker page 
 */
const  selectDate= async (date:Locator,trvlArrow:Locator,page:Page)=>{

    const [targetMonth,targetYear,targetDay]=getDate();

    while(true){
        const dateText:string|null=await date.textContent();
        if (!dateText) {
            throw new Error("Calendar month text not found");
        }
        const [currentMonth,currentYear]=dateText.split(/\s+/);
        if(currentMonth===targetMonth && currentYear==targetYear) break;
        await trvlArrow.click();

    }
    await page.getByText(targetDay,{exact:true}).last().click();

}


export default {getDate,selectDate};