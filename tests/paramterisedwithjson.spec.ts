import { test,Page,expect } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import fs, { Utf8Stream } from 'fs'
import { url } from "inspector";

let jsonpath="Testdata/LoginData.json"
let Logindata:any[]=JSON.parse(fs.readFileSync(jsonpath,'utf-8')) 

Logindata.forEach((data) => {
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
