import { test,Page,expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { url } from "inspector";

const Logindata = [
    {username: 'standard_user', password: 'secret_sauce', expectedMessage: '',urlcur:'/inventory.html',isnocontains:false,isitem:true},
    {username: 'standard_user', password: 'invalid_password', expectedMessage: 'Epic sadface: Username and password do not match any user in this service',urlcur:'/inventory.html',isnocontains:true},
    {username: 'locked_out_user', password: 'secret_sauce', expectedMessage: 'Epic sadface: Sorry, this user has been locked out.',urlcur:'/inventory.html',isnocontains:true},
    {username: '', password: '', expectedMessage: 'Epic sadface: Username is required',urlcur:'/inventory.html',isnocontains:true},
    {username: 'problem_user', password: 'secret_sauce', expectedMessage: '',urlcur:'/inventory.html',isnocontains:false,isitem:true},
    {username: 'performance_glitch_user', password: 'secret_sauce', expectedMessage: '',urlcur:'/inventory.html',isnocontains:false,isitem:true},
    
];
Logindata.forEach(data => {
    test(`Login test with username: ${data.username} and password: ${data.password}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.Login(data.username, data.password);
        await loginPage.verifyLoginPageTitle();
        if (data.expectedMessage) {
            await loginPage.verifyErrorMessage(data.expectedMessage);
        }
        await loginPage.verifyUrlContains(data.urlcur,data.isnocontains)
        if(data.isitem){
            await loginPage.verifyItemsInInventory(0);
        }
    });
});