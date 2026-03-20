import { test , expect} from '@playwright/test'
import fs from 'fs'
import path from 'path'

let dataFile = fs.readFileSync(path.join(__dirname, "../testdata/Day19.task4.json"),"utf-8");
let data = JSON.parse(dataFile);

test("book store" , async({page})=>{
    await page.goto(data.url)
    await page.locator('//div[@class="element-list accordion-collapse collapse show"]/ul/li[@id="item-0"]').click()
    await page.locator('#newUser').click()
    await page.getByPlaceholder('First Name').fill(data.user.firstName)
    await page.getByPlaceholder('Last Name').fill(data.user.lastName)
    await page.getByPlaceholder('UserName').fill(data.user.username)
    await page.getByPlaceholder('Password').fill(data.user.password)
    await page.locator('#register').click()
    await page.locator('#gotologin').click()
    await page.getByPlaceholder('UserName').fill(data.user.username)
    await page.getByPlaceholder('Password').fill(data.user.password)
    await page.locator('#login').click()
    await page.locator('#gotoStore').click()
    await page.getByPlaceholder('Type to search').fill(data.book.title)
    let title = await page.locator('//span[@class="mr-2"]/a').innerText()
    expect(title).toContain("Learning JavaScript Design Patterns")
    await page.locator('//span[@class="mr-2"]/a').click()
    await page.getByRole('button', {name:"Add To Your Collection"}).click()
    page.once("dialog", async dialog => {
        console.log(dialog.message())
        await dialog.dismiss()
    })
    await page.locator("//a[@href='/profile']").click()
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`../screenshots/${date_and_time}.png`})
    await page.getByRole('button' ,{name:"Logout"})

})