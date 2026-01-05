import{test} from '@playwright/test';
import { ProductListingPage } from '../Pages/Product_listing';

test('Verify Product listing page cards',async({page})=>{
    const productListingPage=new ProductListingPage(page);
    await productListingPage.gotoLoginPage();
    await productListingPage.Login('standard_user','secret_sauce'); 
    await productListingPage.verifycardNames();
    await productListingPage.verifypriceincard();
    await productListingPage.verifyimageincard();
    await productListingPage.verifyaddtocartbuttonincard();
})
test('Verify Product listing page sorting functionality',async({page})=>{
    const productListingPage=new ProductListingPage(page);
    await productListingPage.gotoLoginPage();
    await productListingPage.Login('standard_user','secret_sauce'); 
    await productListingPage.verifysortingfunctionality(true,false); //ascending
    await productListingPage.verifysortingfunctionality(false,true); //descending
})

test('Verify Product listing page sorting functionality by Price',async({page})=>{
    const productListingPage=new ProductListingPage(page);
    await productListingPage.gotoLoginPage();
    await productListingPage.Login('standard_user','secret_sauce'); 
    await productListingPage.verifysortingfunctionalitybyprice(true,false); //ascending
    await productListingPage.verifysortingfunctionalitybyprice(false,true); //descending
})

test('Verify Product  details',async({page})=>{
    const productListingPage=new ProductListingPage(page);
    await productListingPage.gotoLoginPage();
    await productListingPage.Login('standard_user','secret_sauce'); 
    await productListingPage.pagedetailsverification();
})