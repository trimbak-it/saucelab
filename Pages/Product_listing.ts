import { Page, expect, Locator } from "@playwright/test"
import { LoginPage } from "./LoginPage"


export class ProductListingPage extends LoginPage{
    private ProductListing:Locator
    private itemname:Locator
    private itemprice:Locator
    private itemimage:Locator
    private addtocartbutton:Locator
    private sortdropdown:Locator
    private itemdescription:Locator
    private backtoproducts:Locator
    
    
    constructor(page:Page){
        super(page)
        this.ProductListing=this.page.locator('//*[@class="inventory_list"]/child::div[@class="inventory_item"]')    
        this.itemname=this.page.locator('//*[@data-test="inventory-item-name"]')
        this.itemprice=this.page.locator('//*[@data-test="inventory-item-price"]')
        this.itemimage=this.page.locator('//*[@class="inventory_item_img"]//img')
        this.addtocartbutton= this.page.getByRole('button',{name:'Add to cart'})
        this.sortdropdown=this.page.locator('//*[@data-test="product-sort-container"]')
        this.itemdescription=this.page.locator('//*[@data-test="inventory-item-desc"]');
        this.backtoproducts=this.page.locator('//*[@data-test="back-to-products"]');
        
    }
    async verifycardNames() {
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        for(let i=0;i<itemCount;i++){
           await  expect(this.itemname.nth(i)).toBeVisible();
           await  expect(this.itemname.nth(i)).toHaveText(/.+/);
            
        }
    }
    async verifypriceincard(){
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        for(let i=0;i<itemCount;i++){
            await expect(this.itemname.nth(i)).toBeVisible();
           await  expect (this.itemprice.nth(i)).toHaveText(/\$\d+(\.\d{2})?/)
        }
    }
    async verifyimageincard(){
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        for(let i=0;i<itemCount;i++){
           await  expect(this.itemimage.nth(i)).toBeVisible({timeout:5000});
        }
    }
    async verifyaddtocartbuttonincard(){
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        for(let i=0;i<itemCount;i++){
            await expect(this.addtocartbutton.nth(i)).toBeVisible();
        }
    }
    async verifysortingfunctionality(ascendingsorting?:boolean|false,descendingsorting?:boolean|true){
        //to be implemented
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        if(ascendingsorting && !descendingsorting){
            await this.sortdropdown.selectOption('az')
        }
        if(descendingsorting){
            await this.sortdropdown.selectOption('za')
        }

        let productnames: string[] = []
        for(let i=0;i<itemCount;i++){
            expect(this.itemname.nth(i)).toBeVisible();
            const names = await this.itemname.nth(i).allInnerTexts();
           productnames = productnames.concat(names);
        }
        const sortedNames = (ascendingsorting && !descendingsorting)?[...productnames].sort((a,b)=>a.localeCompare(b)):[...productnames].sort((a,b)=>b.localeCompare(a));
        expect(productnames).toEqual(sortedNames)
    }

    async verifysortingfunctionalitybyprice(Lowtohigh?:boolean|false,Hightolow?:boolean|true){
        //to be implemented
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        if(Lowtohigh && !Hightolow){
            await this.sortdropdown.selectOption('lohi')
        }
        if(Hightolow){
            await this.sortdropdown.selectOption('hilo')
        }

        let productprices: string[] = []
        for(let i=0;i<itemCount;i++){
            expect(this.itemprice.nth(i)).toBeVisible();
            const prices = await this.itemprice.nth(i).allInnerTexts();
           productprices = productprices.concat(prices);
        }
        const sortedPrices = (Lowtohigh && !Hightolow)
            ? [...productprices].sort((a,b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')))
            : [...productprices].sort((a,b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
        console.log('Sorted Prices:', sortedPrices,'product prises :',productprices );
        expect(productprices).toEqual(sortedPrices)
    }

    async pagedetailsverification(itemnum?:number){
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0); 
        for(let i=0;i<(itemnum ?? itemCount);i++){
            await this.verifyitempagedetails(i);
            await this.backtoproducts.click();

        }
    }
    async verifyitempagedetails(itemindex:number){
        const itemCount = await this.ProductListing.count();
        expect(itemCount).toBeGreaterThan(0);
        const selecteditemname=await this.itemname.nth(itemindex).innerText();
        const selecteditemprice=await this.itemprice.nth(itemindex).innerText();
        const selecteditemimage=await this.itemimage.nth(itemindex).getAttribute('src');
        console.log('Selected Item Image Src:', selecteditemimage);
        const itemdescription = await this.itemdescription.nth(itemindex).innerText();
        console.log('Selected Item Description:', itemdescription);
        await this.itemname.nth(itemindex).click();
        const detailpagename=this.itemname
        const detailpageprice=this.itemprice
        const detailpageimage=this.page.getByAltText(selecteditemname);
        const detailpageitemdescription=this.itemdescription
        expect(detailpagename).toHaveText(selecteditemname);
        expect(detailpageprice).toHaveText(selecteditemprice);
        expect(await detailpageimage.getAttribute('src')).toBe(selecteditemimage);
        expect(detailpageitemdescription).toHaveText(itemdescription);
        expect(this.addtocartbutton).toBeVisible();

    }
    async getproductdetaills(itemnumber:number,cartmodule?:boolean|false){
        try {
            const selecteditemname:string[]=[]
            const selecteditemprice:string[]=[]
            const selecteditemimage:(string|null)[]=[]
            const itemdescription:string[]=[]
            for(let i=0;i<itemnumber;i++){
                selecteditemname.push(await this.itemname.nth(i).innerText())
                selecteditemprice.push(await this.itemprice.nth(i).innerText())
                if(!cartmodule){
                    const imgsrc=await this.itemimage.nth(i).getAttribute('src')
                    selecteditemimage.push(imgsrc)
                }
                itemdescription.push(await this.itemdescription.nth(i).innerText());
            }
            return { selecteditemname, selecteditemimage, selecteditemprice, itemdescription }
            
        } catch (error) {
            console.log
        }
    }


}

