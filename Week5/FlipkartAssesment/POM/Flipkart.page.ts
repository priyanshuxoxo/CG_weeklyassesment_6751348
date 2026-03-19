import { Page } from "@playwright/test"

class flipkart {
    homeBTN: any
    page: any
    store: any
    cloth: any
    product1: any
    add: any
    product2: any
    cart:any
    incQuantity1:any
    incQuantity2:any
    decQuantity1:any
    decQuantity2:any
    placeOrder:any
    constructor(page:Page) {
        this.page = page
        this.homeBTN=page.locator('(//div[@class="css-g5y9jx r-1awozwy r-1xfd6ze r-1a8msfu r-1777fci r-xyw6el r-usgzl9 r-10ou38a"])[6]')
        this.store=page.locator('//img[@src="https://rukminim2.flixcart.com/fk-p-flap/380/380/image/88e557198b04f01c.png?q=90"]')
        this.cloth=page.locator("//img[@src='https://rukminim2.flixcart.com/fk-p-flap/380/510/image/f63af45677b331e7.jpg?q=90']")
        this.product1=page.locator('(//a[@class="pIpigb"])[5]')
        this.add=page.locator('//div[@class="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a" and .="Add to cart"]')
        this.product2=page.locator('(//a[@class="pIpigb"])[8]')
        this.cart=page.locator('//span[.="Cart"]')
        this.incQuantity1=page.locator('(//button[@class="YRzP7Q"])[2]')
        this.incQuantity2=page.locator('(//button[@class="YRzP7Q"])[4]')
        this.decQuantity1=page.locator('(//button[@class="YRzP7Q"])[1]')
        this.decQuantity2=page.locator('(//button[@class="YRzP7Q"])[3]')
        this.placeOrder=page.locator('//button[@class="dSM5Ub JMrpad KcXDCU"]')

    }

    async func(url: string) {
        await this.page.goto(url)
        await this.homeBTN.click()
        await this.store.waitFor({ state: 'visible', timeout: 5000 })
        await this.store.click()
        await this.cloth.click()
        
        const [new_page1] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.product1.click()
        ]);
        let obj1 = new flipkart(new_page1)
        await obj1.add.click()
        await new_page1.close()

        const [new_page2] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.product2.click()
        ]);
        let obj2 = new flipkart(new_page2)
        await obj2.add.click()
        await new_page2.close()

        await this.cart.click()
        await this.incQuantity1.click()
        await this.incQuantity2.click()
        await this.decQuantity1.click()
        await this.decQuantity2.click()
        await this.placeOrder.click()

        let time=new Date().getTime()
        await this.page.screenshot({path:`../screenshots/task1${time}.png`})
    }
}
export default flipkart















































