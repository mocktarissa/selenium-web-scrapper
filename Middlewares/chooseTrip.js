var webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
// const client = require('./redisClient');
const { Builder, By, Key, until } = require("selenium-webdriver");
var options = new chrome.Options();
options.addArguments("--headless");


module.exports = async function travel(client) { 
  const screen = {
    width: 640,
    height: 480,
  };
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().windowSize(screen)) // just change with new chrome.Options().headless().windowSize(screen)
    .build();
    let cook ; 
   
   
    await driver.manage().deleteAllCookies();
    await client.get("thecookieidefinedforthisuser",async function(err, reply) {
        // reply is null when the key is missing
        cook = reply;
        console.log('session values');
        console.log(JSON.parse(reply));
        console.log('Up there');
        cook =JSON.parse(reply) 
        cook.map(
          async (c)=>{        

              await driver.manage().addCookie(c);
            
          }
        )
        
      }); 
     
      
      await driver.get(
        "https://ebilet.tcddtasimacilik.gov.tr/view/eybis/tnmGenel/int_sat_001.jsf"
      );
  
  
//  let temp= await driver.manage().getCookies();
//  console.log(temp)
  (await driver).quit;

};
