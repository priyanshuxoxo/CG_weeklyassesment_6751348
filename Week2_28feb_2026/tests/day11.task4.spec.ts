import { test } from "@playwright/test";

test("Tokyo medal",async({page})=>{
   await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
   await page.locator("//a [@href='/en/olympic-games/tokyo-2020/results']").first().click()
   await page.locator("//p [@data-cy='ocs-text-module']").click();
   const medal=await page.locator("//div[@data-medal-id='silver-medals-row-2']").textContent();
   console.log(medal);
   await page.screenshot({path:"../screenshots/medal.png"})
   

})