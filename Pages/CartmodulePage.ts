import { Page,expect,Locator } from "@playwright/test";
import { LoginPage } from "./LoginPage";


export class CartmodulePage extends LoginPage{
     addtocartbutton:Locator
     removecartbutton:Locator
     shoppingcartbadge:Locator
     shoppingcartlink:Locator
     cartlist:Locator
     cartgobackbutton:Locator
     
     
    
    constructor(page:Page){
        super(page);
        this.addtocartbutton=this.page.locator("//*[contains(@data-test,'add-to-cart')]")
        this.removecartbutton=this.page.getByRole("button",{name:"Remove"})
        this.shoppingcartbadge=this.page.locator("//*[@data-test='shopping-cart-badge']")
        this.shoppingcartlink=this.page.locator("//*[@data-test='shopping-cart-link']")
        this.cartlist=this.page.locator("//*[@data-test='inventory-item']")
        this.cartgobackbutton=this.page.getByRole("button",{name:'Go back Continue Shopping'})
    }

    async addmultipleitem(itemnumber?:number,itemname?:string[]){
        try {
            if(itemnumber){
                for(let i=0;i<itemnumber;i++){
                await this.clickbutton(this.page.getByRole("button",{name:"Add to cart"}).nth(i))
                }
            }
            if(itemname) {
                for(let j=0;j<itemname.length;j++){
                    let prodname=itemname[j].replaceAll(' ','-').toLowerCase()
                    await this.clickbutton(this.page.locator(`//*[@data-test='add-to-cart-${prodname}']`))
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    

    
     
}
