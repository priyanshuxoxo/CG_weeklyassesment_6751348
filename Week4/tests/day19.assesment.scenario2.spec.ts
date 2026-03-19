import {test} from "@playwright/test";
import fs from "fs";
import path from 'path'

let dataFile=fs.readFileSync(path.join(__dirname, '../testdata/day19.task2.json'),"utf-8");

let data=JSON.parse(dataFile);
 

test("Register Multiple users using excel",async({page})=>{
    let photoPath:string[]=[path.join(__dirname,"./uploadPicture/car.png"),path.join(__dirname,"./uploadPicture/dolphin.png"),path.join(__dirname,"./uploadPicture/fruit.png")]
    let k=0;
    for(let d of data){
        page.on("dialog",async(dialog)=>{
            await dialog.accept();
        })
        await page.goto("https://demoqa.com/automation-practice-form");
        await page.getByPlaceholder("First Name").fill(d.firstName);
        await page.getByPlaceholder("Last Name").fill(d.lastName);
        await page.locator("#userEmail").fill(d.email);
        await page.locator(`//label[text()='${d.gender}']`).click()
        await page.getByPlaceholder("Mobile Number").fill(d.phoneNumber);
        await page.locator("#dateOfBirthInput").click();
        let dob=new Date(d.dob);
        let year=dob.getFullYear().toString();
        let month = dob.toLocaleString('default', { month: 'long' });
        let day = dob.getDate().toString().padStart(2,'0');
        await page.locator("//select[@class='react-datepicker__year-select']").selectOption(year);
        await page.locator("//select[@class='react-datepicker__month-select']").selectOption(month);
        await page.locator(`.react-datepicker__day--0${day}`).first().click();
        await page.locator(".subjects-auto-complete__input").fill(d.subject);
        await page.keyboard.press("Enter")
        await page.locator(`//label[@class="form-check-label" and .='${d.hobbies}']`).click();
        await page.locator("#uploadPicture").setInputFiles(photoPath[k % photoPath.length]);
        k++;
        await page.getByPlaceholder("Current Address").fill(d.address);
        await page.locator("#state").click();
        await page.getByText(d.state).click();
        await page.locator("#city").click();
        await page.getByText(d.city).click();
        await page.locator("#submit").click();
        await page.screenshot({path:`../screenshots/${d.firstName}.png`});
        await page.locator("#closeLargeModal").click();
    }
    
})