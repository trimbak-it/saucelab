import { Page,expect,Locator } from "@playwright/test";

export class BasePage {
  protected page: Page; 
  constructor(page: Page) {
    this.page = page;
  }
    async navigateToUrl(url: string) {  
        await this.page.goto(url);
    }
    async verifyTitle(expectedTitle: string) {
        const actualTitle = await this.page.title();
        expect(actualTitle).toBe(expectedTitle);
    }
    async verifyUrlContains(expectedSubstring: string,isnotcontains?:boolean) {
        const currentUrl = this.page.url();
        
        if(isnotcontains){
        expect(currentUrl,'UrL should Not be Match user not navigate on respective page').not.toContain(expectedSubstring);
        }
        else{
        expect(currentUrl,'url should be Match user not navigate on respective page ').toContain(expectedSubstring);
        }
      }

      async clickbutton(buttonlocator:Locator){
        try {
            await buttonlocator.click()
        } catch (error) {
            console.log(error)
        }
      }
      async filltextbox(textbox:Locator,inputvalue:(string)){
        try {
          await textbox.fill(inputvalue)
        } catch (error) {
          console.log(error)
        }
      }
      async gettext(input:Locator){
        return await input.innerText()
      }
        
}