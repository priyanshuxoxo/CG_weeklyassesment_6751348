import { test, expect } from "@playwright/test";

test("task1", async ({ page }) => {

  await page.goto("https://www.amazon.in/");

  await page.locator("#twotabsearchtextbox").fill("shoes");
  await page.locator("#nav-search-submit-button").click();
  const firstProduct = page.locator("div.s-main-slot div[data-component-type='s-search-result']").first();

  await firstProduct.waitFor();

  const name = await firstProduct.locator("h2 span").first().textContent();
  const price = await firstProduct.locator(".a-price-whole").first().textContent();

  console.log("Product Name:", name);
  console.log("Price:", price);

  await page.screenshot({
    path: "../screenshots/shoes.png",
    fullPage: true
  });

});