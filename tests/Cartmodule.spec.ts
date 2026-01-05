import { test,expect  } from "@playwright/test";
import { CartmodulePage } from "../Pages/CartmodulePage";
import{ProductListingPage} from "../Pages/Product_listing"
test('Verify cartbadge and removebutton',async({page})=>{
    const Cartmodule=new CartmodulePage(page)
    await Cartmodule.gotoLoginPage();
    await Cartmodule.Login("standard_user","secret_sauce")
    await Cartmodule.clickbutton( Cartmodule.addtocartbutton.first())
    await expect(Cartmodule.removecartbutton).toBeEnabled({enabled:true})
    await expect(Cartmodule.shoppingcartbadge).toHaveText("1")
})

test('Add multiple items and verify cart contents',async({page})=>{
    const Cartmodule=new CartmodulePage(page)
    const prodctlist=new ProductListingPage(page)
    await Cartmodule.gotoLoginPage();
    await Cartmodule.Login("standard_user","secret_sauce")
    let itemnum=3
    let inventproductdetails:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(itemnum);
    await Cartmodule.addmultipleitem(undefined,inventproductdetails?.selecteditemname)
    await Cartmodule.clickbutton(Cartmodule.shoppingcartlink)
    expect(await Cartmodule.cartlist.count()).toBe(parseInt(await Cartmodule.shoppingcartbadge.innerText()))
    let cartproductdetails:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(3,true)//await Cartmodule.cartlist.count())
    if(inventproductdetails && cartproductdetails){
        expect(inventproductdetails.selecteditemname).toStrictEqual(cartproductdetails.selecteditemname)
        expect(inventproductdetails.selecteditemprice).toStrictEqual(cartproductdetails.selecteditemprice)
        //expect(inventproductdetails.selecteditemimage).toStrictEqual(cartproductdetails.selecteditemimage)
        expect(inventproductdetails.itemdescription).toStrictEqual(cartproductdetails.itemdescription)
    }
    else{
        test.fail()
    }


})

test('remove one  itemfrom cart  and verify cartbadge count',async({page})=>{
    const Cartmodule=new CartmodulePage(page)
    const prodctlist=new ProductListingPage(page)
    await Cartmodule.gotoLoginPage();
    await Cartmodule.Login("standard_user","secret_sauce")
    let itemnum=2
    await Cartmodule.addmultipleitem(itemnum)
    await Cartmodule.clickbutton(Cartmodule.shoppingcartlink)
    let cartproductdetail:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(2,true)//await Cartmodule.cartlist.count())
    await prodctlist.clickbutton(Cartmodule.removecartbutton.first())
    expect(await Cartmodule.cartlist.count()).toBe(parseInt(await Cartmodule.shoppingcartbadge.innerText()))
    let cartproductdetails:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(await Cartmodule.cartlist.count(),true)//await Cartmodule.cartlist.count()
    expect(cartproductdetail?.selecteditemname).not.toContainEqual(cartproductdetails?.selecteditemname)

})


test('Cart persistence during navigation',async({page})=>{
    const Cartmodule=new CartmodulePage(page)
    const prodctlist=new ProductListingPage(page)
    await Cartmodule.gotoLoginPage();
    await Cartmodule.Login("standard_user","secret_sauce")
    let itemnum=2
    await Cartmodule.addmultipleitem(itemnum)
    await Cartmodule.clickbutton(Cartmodule.shoppingcartlink)
    let cartproductdetail:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(await Cartmodule.cartlist.count(),true)//await Cartmodule.cartlist.count())
    let cartbadgecount= parseInt(await Cartmodule.shoppingcartbadge.innerText())
    await Cartmodule.clickbutton(Cartmodule.cartgobackbutton)
    expect(parseInt(await Cartmodule.shoppingcartbadge.innerText()),'matching badge count ').toBe(cartbadgecount)
    await Cartmodule.clickbutton(Cartmodule.shoppingcartlink)
    let cartproductdetails:{selecteditemname:string[],selecteditemimage:(string|null)[],selecteditemprice:string[],itemdescription:string[]}|undefined=await prodctlist.getproductdetaills(await Cartmodule.cartlist.count(),true)//await Cartmodule.cartlist.count()
    if(cartproductdetails && cartproductdetail){
        expect(cartproductdetail.selecteditemname).toStrictEqual(cartproductdetails.selecteditemname)
    }
    else{
        test.fail()
    }
    

})