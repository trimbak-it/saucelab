import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
 
 let loginPage:LoginPage


test.beforeAll(async({browser})=>{
  const page=await browser.newPage()
   loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
})


test('@Sanity  Login successfull', async ({  }) => {
  
  await loginPage.Login('standard_user', 'secret_sauce');
  // Add assertions here to verify the error message is displayed 
  await loginPage.verifyLoginPageTitle();
  await loginPage.verifyUrlContains('/inventory.html')
  await loginPage.verifyItemsInInventory(0) ;

});

test('Login with invalid credentials', async ({  }) => {
  //const loginPage = new LoginPage(page);
  //await loginPage.gotoLoginPage();
  await loginPage.Login('standard_user', 'invalid_password');
  // Add assertions here to verify the error message is displayed 
  await loginPage.verifyLoginPageTitle();
  await loginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user in this service");

});

test('Login with lockedout user',async ({ }) =>{
    //const loginPage = new LoginPage(page);
    //await loginPage.gotoLoginPage();
    await loginPage.Login('locked_out_user', 'secret_sauce');
    await loginPage.verifyLoginPageTitle();
    await loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out."); 
    await loginPage.verifyUrlContains('/inventory.html',true)
})

test('Login with emoty credentials',async({ })=>{
    //const loginPage = new LoginPage(page);
    //await loginPage.gotoLoginPage();
    await loginPage.Login('', '');
    await loginPage.verifyLoginPageTitle();
    await loginPage.verifyErrorMessage("Epic sadface: Username is required"); 
    await loginPage.verifyUrlContains('/inventory.html',true)
})