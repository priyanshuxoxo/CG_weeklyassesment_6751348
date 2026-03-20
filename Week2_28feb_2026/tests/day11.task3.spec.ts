import { test } from "@playwright/test";

test("QSpiders Scenario 1 - Register & Login", async ({ page }) => {


  await page.goto("https://demoapps.qspiders.com/ui?scenario=1");

  await page.locator("//input[@placeholder='Enter your name']").fill("Priyanshu");
  await page.locator("//input[@placeholder='Enter Your Email']").fill("priyanshu@test.com");
  await page.locator("//input[@placeholder='Enter your password']").fill("Test@123");

  await page.locator("//button[text()='Register']").click();
  await page.locator("(//input[@placeholder='Enter your email'])")
    .fill("priyanshu@test.com");

  await page.locator("(//input[@placeholder='Enter your password'])")
    .fill("Test@123");
  await page.locator("//button[text()='Login']").click();
  await page.screenshot({path:"../screenshots/qspiders.png"})

});