import {Page,expect,Locator} from '@playwright/test';
import {Checkoutpage} from '../Pages/checkoutpage';

export class Logoutpage extends Checkoutpage{
    menubutton:Locator
    logoutbutton:Locator
    static forworderrormessage:string="Epic sadface: You can only access '/inventory.html' when you are logged in."
    constructor(page:Page){
        super(page)
        this.menubutton=this.page.getByRole('button',{name:'Open Menu'})
        this.logoutbutton=this.page.getByRole('link',{name:'Logout'})
    }
}