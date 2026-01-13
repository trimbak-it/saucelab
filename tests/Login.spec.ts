import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import fs from 'fs'
 
 let loginPage:LoginPage
 let jsonpath="Testdata/LoginData.json"
 let Logindata:any=JSON.parse(fs.readFileSync(jsonpath,'utf-8'))


test.beforeAll(async({browser})=>{
  const page=await browser.newPage()
   loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
})


test('@Sanity  Login successfull', async ({  }) => {
  
  await loginPage.Login(Logindata.Validuser.username, Logindata.Validuser.password);
  // Add assertions here to verify the error message is displayed 
  await loginPage.verifyLoginPageTitle();
  await loginPage.verifyUrlContains('/inventory.html')
  await loginPage.verifyItemsInInventory(0) ;

});

test('Login with invalid credentials', async ({  }) => {
  //const loginPage = new LoginPage(page);
  //await loginPage.gotoLoginPage();
  await loginPage.Login(Logindata.invalidpassword.username, Logindata.invalidpassword.password);
  // Add assertions here to verify the error message is displayed 
  await loginPage.verifyLoginPageTitle();
  await loginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user in this service");

});

test('Login with lockedout user',async ({ }) =>{
    //const loginPage = new LoginPage(page);
    //await loginPage.gotoLoginPage();
    await loginPage.Login(Logindata.Lockeduser.username, Logindata.Lockeduser.password);
    await loginPage.verifyLoginPageTitle();
    await loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out."); 
    await loginPage.verifyUrlContains('/inventory.html',true)
})

test('Login with empty credentials',async({ })=>{
    await loginPage.Login('', '');
    await loginPage.verifyLoginPageTitle();
    await loginPage.verifyErrorMessage("Epic sadface: Username is required"); 
    await loginPage.verifyUrlContains('/inventory.html',true)
})