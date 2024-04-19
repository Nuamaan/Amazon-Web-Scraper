import { chromium } from "playwright";
import { wait } from "./wait";

export async function main() {
  /**
   * Solution goes here
   */
  const searchItems:string[] = ['nvidia 3060','nvidia 3070','nvidia 3080']
  const ansObj={};
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  for(const searchItem of searchItems){
    await page.goto('https://www.amazon.com/')
    await page.getByPlaceholder('Search Amazon').fill(searchItem);
    await page.getByRole('button', { name: 'Go' }).click();
    await page.getByText('Sort by:Featured').click();
    await page.getByRole('option', { name: 'Price: Low to High' }).getByText('Price: Low to High').click();
    await page.pause();
    let curPrices = [];

    for(let i = 0 ; i<3; i++){
      await page.pause();
      let  price = await page.locator('.s-result-item .a-price-whole').nth(i).innerText()
      if(ansObj.hasOwnProperty(searchItem)){
        ansObj[searchItem].push(price)
      }else{
        ansObj[searchItem]=[price]
      }
      console.log(price);
    }
    console.log(ansObj);



  }
  


  // wait - for easy debugging
  await wait(5000)

}
