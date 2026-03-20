import { test } from "@playwright/test";

test("amazon-locator", async ({ page }) => {

  await page.goto("https://www.amazon.in/");

  await page.locator("//input[@id='twotabsearchtextbox']").fill("shoes");
  await page.locator("//input[@id='nav-search-submit-button']").click();

  await page.locator("//span[text()='Get It by Tomorrow']").click();
  const name = await page
    .locator("//div[@data-component-type='s-search-result']//h2")
    .nth(3)
    .textContent();

  const price = await page
    .locator("//div[@data-component-type='s-search-result']//span[@class='a-price-whole']")
    .nth(3)
    .textContent();

  console.log("Product Name:", name);
  console.log("Product Price:", price);

  await page.screenshot({ path: "../screenshots/amazon.png" });

});