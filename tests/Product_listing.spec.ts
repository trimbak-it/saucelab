import{Page, test} from '@playwright/test';
import { ProductListingPage } from '../Pages/Product_listing';
let page:Page
let productListingPage:ProductListingPage

test.beforeAll(async({browser})=>{
    page=await browser.newPage();
    productListingPage=new ProductListingPage(page)
    await productListingPage.gotoLoginPage();
    await productListingPage.Login('standard_user','secret_sauce');
})

test('Verify Product listing page cards',async({})=>{
    await productListingPage.verifycardNames();
    await productListingPage.verifypriceincard();
    await productListingPage.verifyimageincard();
    await productListingPage.verifyaddtocartbuttonincard();
})
test('Verify Product listing page sorting functionality',async({})=>{ 
    await productListingPage.verifysortingfunctionality(true,false); //ascending
    await productListingPage.verifysortingfunctionality(false,true); //descending
})

test('Verify Product listing page sorting functionality by Price',async({})=>{ 
    await productListingPage.verifysortingfunctionalitybyprice(true,false); //ascending
    await productListingPage.verifysortingfunctionalitybyprice(false,true); //descending
})

test('Verify Product  details',async({})=>{ 
    await productListingPage.pagedetailsverification();
})