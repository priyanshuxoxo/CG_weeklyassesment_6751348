import {  Page } from '@playwright/test';

/**
 * this is helper method to take screenshoot of the desired page
 */
const takeScreenShoot=async(page:Page,type:string):Promise<void>=>{
    await page.screenshot({
        path:`screenshots/${type}-${Date.now()}.png`,
        fullPage:true
    })
}
export default takeScreenShoot;