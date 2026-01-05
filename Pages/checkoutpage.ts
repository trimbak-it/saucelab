import { Page ,Locator} from "@playwright/test";
import { CartmodulePage } from "./CartmodulePage";

export class Checkoutpage extends CartmodulePage{
    checkoutbutton:Locator
    firstname:Locator
    lastname:Locator
    zipcode:Locator
    continuebutton:Locator
    gobackcancelbutton:Locator
    itemtotal:Locator
    taxlabel:Locator
    totalprice:Locator
    finishbutton:Locator
    thankyou:Locator
    static firstnameerrormessage:string='Error: First Name is required'
    static lastnameerrormassage:string='Error: Last Name is required'
    static ziperrormessage:string='Error: Postal Code is required'
    static checkouttitle:string='Checkout: Overview'

    constructor(page:Page){
        super(page)
        this.checkoutbutton= this.page.getByRole("button",{name:'Checkout'})
        this.firstname=this.page.getByRole('textbox',{name:'First Name'})
        this.lastname=this.page.getByPlaceholder('Last Name',{exact:true})
        this.zipcode=this.page.getByPlaceholder('Zip/Postal Code',{exact:true})
        this.continuebutton=this.page.getByRole('button',{name:'Continue'})
        this.gobackcancelbutton=this.page.getByRole('button',{name:'Go back Cancel'})
        this.itemtotal=this.page.locator("//*[@data-test='subtotal-label']")
        this.taxlabel=this.page.locator("//*[@data-test='tax-label']")
        this.totalprice=this.page.locator("//*[@data-test='total-label']")
        this.finishbutton=this.page.getByRole('button',{name:'Finish'})
        this.thankyou=this.page.getByRole('heading',{name:'Thank you for your order!'})
        
   
    }

    async enteruserinformation(firstname?:string,lastname?:string,Zipcaode?:string){
        try {
            if(firstname){
                await this.filltextbox(this.firstname,firstname)
            }
            if(lastname){
                await this.filltextbox(this.lastname,lastname)
            }
            if(Zipcaode){
                await this.filltextbox(this.zipcode,Zipcaode)
            }
            await this.clickbutton(this.continuebutton)

        } catch (error) {
            console.log(error)
        }
    }


}
