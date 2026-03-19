    import {test} from "@playwright/test"

    import flipkart from "../FlipkartAssesment/POM/Flipkart.page";


    test("task1", async({browser})=>{
        let context=await browser.newContext()
        let page=await context.newPage()
        let obj=new flipkart(page)
        await obj.func("https://www.flipkart.com/")
    })


