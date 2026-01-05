import { Page,expect,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { error } from "console";

export class LoginPage extends BasePage{
    UserName:Locator
    Userpassword:Locator
    LoginButton:Locator
    errormsg:Locator
    Loginurl:string="https://www.saucedemo.com/"
    

    constructor(page:Page){
        super(page)
        this.UserName=page.locator('#user-name')
        this.Userpassword=page.locator('#password')
        this.LoginButton=page.locator('#login-button')
        this.errormsg = page.locator("//*[@data-test='error']")
    }

    async gotoLoginPage(){
        await this.navigateToUrl(this.Loginurl)
    }
    async Login(username:string,password:string){
        try {
            await this.UserName.fill(username)
            await this.Userpassword.fill(password)
            await this.LoginButton.click()
        } catch (error) {
            console.error(error)
        }
    }
    async verifyLoginPageTitle(){
        await this.verifyTitle('Swag Labs')
    }
    async verifyErrorMessage(errorMessage:string){
        try {
             expect(await this.errormsg.textContent(),{message:'error should be present '}).toBe(errorMessage);
        } catch (error) {
         console.log(error)   
        }
    }
    async verifyItemsInInventory(expectedItemCount: number) {
        const items = this.page.locator("//*[@data-test='inventory-list'] //*[@data-test='inventory-item']");
        const itemCount = await items.count();
        if (itemCount > expectedItemCount ) {
            for(let i = 0; i < itemCount; i++){
                await expect(items.nth(i)).toBeVisible();
            }
        }
        else{
            throw new Error(`Expected more than ${expectedItemCount} items, but found ${itemCount}`);
        }
    }
   
}