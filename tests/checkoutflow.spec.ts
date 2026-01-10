import {test,expect, Page} from '@playwright/test'
import { Checkoutpage } from '../Pages/checkoutpage'
import {ProductListingPage} from '../Pages/Product_listing'

let checkout:Checkoutpage;
let productpage:ProductListingPage;
let page:Page


test.beforeAll(async({browser})=>{
    page=await browser.newPage()
    checkout = new Checkoutpage(page);
    await checkout.gotoLoginPage();
    productpage= new ProductListingPage(page)
    await checkout.Login('standard_user','secret_sauce')
})

test('Checkout with missing mandatory field',async({})=>{
    
    await checkout.clickbutton(checkout.addtocartbutton.first())
    await checkout.clickbutton(checkout.shoppingcartlink)
    await checkout.clickbutton(checkout.checkoutbutton)
    let checkouturl=page.url()
    await checkout.enteruserinformation()
    expect(page.url()).toEqual(checkouturl)
    await checkout.verifyErrorMessage(Checkoutpage.firstnameerrormessage)
    await checkout.enteruserinformation('Bharat')
    await checkout.verifyErrorMessage(Checkoutpage.lastnameerrormassage)
    await checkout.enteruserinformation('Bharat','raman')
    await checkout.verifyErrorMessage(Checkoutpage.ziperrormessage)
})

test('Cancel from checkout overview',async({})=>{
    await checkout.clickbutton(checkout.addtocartbutton.first())
    await checkout.clickbutton(checkout.shoppingcartlink)
    await checkout.clickbutton(checkout.checkoutbutton)
    await checkout.enteruserinformation('Bharat','raman','09876')
    let overviewtitle=await checkout.gettext(page.locator("//*[@data-test='title']"))
    expect(overviewtitle,'Procees Not nevigate on final checkoput page ').toStrictEqual(Checkoutpage.checkouttitle)
    await checkout.clickbutton(checkout.gobackcancelbutton)
    await checkout.verifyUrlContains('/inventory.html')
})

test('@Sanity Checkout with valid customer info',async ({})=>{
    let itemnum=2
    let productdetail:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await productpage.getproductdetaills(itemnum,true)//await Cartmodule.cartlist.count())
    if(productdetail){
         await checkout.addmultipleitem(undefined,productdetail.selecteditemname)
    }
    else{
        await checkout.addmultipleitem(1)
    }
   
    await checkout.clickbutton(checkout.shoppingcartlink)
    await checkout.clickbutton(checkout.checkoutbutton)
    await checkout.enteruserinformation('Bharat','raman','09876')
    let overviewproddetails:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await productpage.getproductdetaills(await checkout.cartlist.count(),true)//await Cartmodule.cartlist.count())
    expect(overviewproddetails?.selecteditemname).toStrictEqual(productdetail?.selecteditemname)
    expect(overviewproddetails?.selecteditemprice).toStrictEqual(productdetail?.selecteditemprice)
    let totalfromprices=[...overviewproddetails?.selecteditemprice??[]].reduce((a,b)=>a+parseFloat(b.replace('$','')),0)
    let totalpriceofproduct=(await checkout.gettext(checkout.itemtotal))
    console.log(totalfromprices,'  ',totalpriceofproduct)
    expect(parseFloat(totalpriceofproduct.substring(totalpriceofproduct.indexOf('$')+1,totalpriceofproduct.length)),'Product total and overview product total not matching ').toBe(totalfromprices)
    let taxprice=await checkout.gettext(checkout.taxlabel)
    let finaltoal=await checkout.gettext(checkout.totalprice)
    expect(parseFloat(finaltoal.substring(finaltoal.indexOf('$')+1,finaltoal.length))).toEqual(parseFloat(totalpriceofproduct.substring(totalpriceofproduct.indexOf('$')+1,totalpriceofproduct.length))+parseFloat(taxprice.substring(taxprice.indexOf('$')+1,taxprice.length)))
})  