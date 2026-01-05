import {test,expect} from '@playwright/test'
import {Logoutpage} from '../Pages/logoutPage'

test('Logout from burger menu',async({page})=>{
    const logout=new Logoutpage(page)
    await logout.gotoLoginPage()
    await logout.Login('standard_user','secret_sauce')
    await logout.clickbutton(logout.menubutton)
    await logout.clickbutton(logout.logoutbutton)
    expect(logout.LoginButton,{message:'Login button should be visible on login page '}).toBeVisible({timeout:1000,visible:true})
    await page.goBack()
    await logout.verifyUrlContains('/inventry.html',true)
    await logout.verifyErrorMessage(Logoutpage.forworderrormessage)
})

test('Direct URL access without login',async({page})=>{
    const logout=new Logoutpage(page)
    await logout.navigateToUrl("https://www.saucedemo.com/inventory.html")
    expect(page).toHaveURL(logout.Loginurl)
    await logout.verifyErrorMessage(Logoutpage.forworderrormessage)
})
