/*
Documentation website: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html

Useful ressource https://medium.com/@bmshamsnahid/automated-testing-with-selenium-webdriver-and-node-js-f99f64720352
*/
const app = require("express")();
var webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const { Builder, By, Key, until } = require("selenium-webdriver");

var options = new chrome.Options();
options.addArguments("--headless");
const screen = {
    width: 640,
    height: 480,
};
app.get("/api", (req, res) => {
    console.log("Get");
    res.json("You dump");
});

app.listen("3000", () => {
    console.log("Server runiing");
});

let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().windowSize(screen)) // just change with new chrome.Options().headless().windowSize(screen)
    .build();

async function travel() {
    await driver.get(
        "https://ebilet.tcddtasimacilik.gov.tr/view/eybis/tnmGenel/tcddWebContent.jsf"
    );
    await new Promise(resolve => setTimeout(resolve, 2500));
    //origin
    await driver.findElement(By.name("nereden")).sendKeys("İstanbul(Pendik)");
    //destination
    await driver.findElement(By.name('trCalGid_input')).sendKeys(Key.chord(Key.CONTROL, "a"),'08.10.2020' );
    // departure date
    await new Promise(resolve => setTimeout(resolve, 2500));
    await driver.findElement(By.name("nereye")).sendKeys("Eskişehir",Key.RETURN);
    // number of traveller
    // await driver.findElement(By.name('syolcuSayisi_input')).sendKeys('1', Key.RETURN);
    await new Promise(resolve => setTimeout(resolve, 2500));
    // click the button
    // let id = await driver.findElement(By.id("btnSeferSorgula")).click();

    await new Promise(resolve => setTimeout(resolve, 4000));
    // await driver.executeScript("return document.readyState;") == "complete" 
    // await driver.wait(1000, 15000, 'Looking for element');
    // await driver.wait(until.elementTextContains( element, substr )  == "complete", 15000, 'Looking for element');
    // await driver.wait.until {
    //     
    // }
    // driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    // await driver.executeScript("console.log(window.location.href)");

    // choose a trip
    await driver.findElement(By.id('mainTabView:gidisSeferTablosu:0:j_idt117')).click();

    await new Promise(resolve => setTimeout(resolve, 3000));
    // NEXT PAGE 
    await driver.findElement(By.id('mainTabView:btnDevam44')).click();

    await new Promise(resolve => setTimeout(resolve, 4000));
    
    /*
    For getting the list of vagons CHECK FOR ALL ELEMENTS THAT HAVE THE CLASS 'vagonText' and count them
    each vagon is a button identified by id 'mainTabView:j_idt206:${number of the vagon (starts from 0)}:gidisVagonlariGost'
    click on vagons one by one to get the list of both seats and empty seats 
    */
   /*
   fetch 'ui-wagon-item-title' 's parent element check if it has a input field,
   if there is an input field the there is empty space in that VAGON
   */
  // await driver
  //         .findElement(By.css(".ui-wagon-item-checkbox"))
  //         .click();
  

   // //bring pprice dropdown
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await driver
    //     .findElement(
    //         By.id("mainTabView:gidisSeferTablosu:0:j_idt109:0:somVagonTipiGidis1")
    //     )
    //     .click();
    // //click on the second option FOR PRICE 
    // await driver
    //     .findElement(By.css(".ui-selectonemenu-item:not(.ui-state-highlight)"))
    //     .click();

    //see if the doc is where it should be
    // let id= await driver.findElement(By.id('#mainTabView:j_idt60'));
    // console.log(id);

    //  driver.quit();
}
travel();
