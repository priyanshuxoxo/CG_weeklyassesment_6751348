import {test} from "@playwright/test";

test("icc-ranking-women-task", async({page})=>{
    await page.goto("https://www.icc-cricket.com/rankings")
    await page.locator("//button[@id='onetrust-reject-all-handler']").click();
    let rank=await page.locator('//section[@id="womens-batting-rankings"]/descendant::table[@class="w-full border-collapse"][1]/descendant::span[@class="text-xs font-extrabold uppercase text-primary pr-2"][2]').innerText()
    console.log("Laura Wolvaardt: ",rank)
    let time=new Date().getTime()
    await page.screenshot({path:`../screenshots/day13-task1-sc-${time}.png`})
})