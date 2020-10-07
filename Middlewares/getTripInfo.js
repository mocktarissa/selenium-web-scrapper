var webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const client = require('./redisClient');
const { Builder, By, Key, until } = require("selenium-webdriver");
var options = new chrome.Options();
options.addArguments("--headless");


module.exports = async function travel() {
  const screen = {
    width: 640,
    height: 480,
  };
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless().windowSize(screen)) // just change with new chrome.Options().headless().windowSize(screen)
    .build();
  await driver.get(
    "https://ebilet.tcddtasimacilik.gov.tr/view/eybis/tnmGenel/tcddWebContent.jsf"
  );
  await new Promise((resolve) => setTimeout(resolve, 2500));
  //origin
  await driver.findElement(By.name("nereden")).sendKeys("İstanbul(Pendik)");
  //destination
  await driver
    .findElement(By.name("trCalGid_input"))
    .sendKeys(Key.chord(Key.CONTROL, "a"), "08.10.2020");
  // departure date
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await driver.findElement(By.name("nereye")).sendKeys("Eskişehir", Key.RETURN);
  // number of traveller
  // await driver.findElement(By.name('syolcuSayisi_input')).sendKeys('1', Key.RETURN);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  // click the button
  //   let id = await driver.findElement(By.id("btnSeferSorgula")).click();

  //   await new Promise((resolve) => setTimeout(resolve, 4000));

  // get the number of trips
  let tripsList = await driver.findElement(
    By.id("mainTabView:gidisSeferTablosu_data")
  );

  let trips = await tripsList.getAttribute("childElementCount");
  console.log(trips);

  /* Extract the contents for each trip return it as the following json:
    [
        {
            'departureTime':'',
            'arrivalTime':'',
            'departureDate':'',
            'arrivalDate':'',
            'duration':'',
            'vagonType':'', // use this to extract the number of empty seats if it is more that 2 then Ok
            'price':'', // alternatively send the price for other as well
        }
    ]
    
    */
  let responTripsList = [];
  for (let i = 0; i < trips; i++) {
    let tr = tripsList.findElement(By.css(`tr[data-ri='${i}']`));
    let departureTime = (
      await tr.findElement(By.css(`td:nth-child(1)`)).getText()
    )
      .replace("\n", ",")
      .split(",")[1];

    let departureDate = (
      await tr.findElement(By.css(`td:nth-child(1)`)).getText()
    )
      .replace("\n", ",")
      .split(",")[0];
    let arrivalDate = (
      await tr.findElement(By.css(`td:nth-child(3)`)).getText()
    )
      .replace("\n", ",")
      .split(",")[0];
    let arrivalTime = (
      await tr.findElement(By.css(`td:nth-child(3)`)).getText()
    )
      .replace("\n", ",")
      .split(",")[1];
    let duration = await tr.findElement(By.css(`td:nth-child(2)`)).getText();
    let vagonType = await tr.findElement(By.css(`td:nth-child(5)`)).getText();
    let price = await tr.findElement(By.css(`td:nth-child(6)`)).getText();
    let toClick = await tr
      .findElement(By.css(`td:nth-child(7) div`))
      .getAttribute("id");
    responTripsList.push({
      departureTime,
      departureDate,
      arrivalDate,
      arrivalTime,
      duration,
      vagonType,
      price,
      toClick,
    });
  }
  console.log(responTripsList);
  /*
      Assign a session cookie to the user 
      Map that session cookie with the one from the browser driver 
      Store that mapped value in reddis  
      */
  // Retrieve the current cookies status
  let cook = await driver.manage().getCookies();
// client.set("key", "value", redis.print);
//   client.get("key", redis.print);
// console.log(cook);
  client.set("thecookieidefinedforthisuser",JSON.stringify(cook), function(err, reply) {
    console.log(reply);
  });
 client.get("thecookieidefinedforthisuser",function(err, reply) {
    // reply is null when the key is missing
    // cook = reply;
    console.log(reply);
  }); 
  // after the choice on the UI make a request to the page and then set the cookie as the one stored for that secific user
//   driver.manage().addCookie(arg0);
  driver.quit();
  return responTripsList;

  // await driver.executeScript("return document.readyState;") == "complete"
  // await driver.wait(1000, 15000, 'Looking for element');
  // await driver.wait(until.elementTextContains( element, substr )  == "complete", 15000, 'Looking for element');
  // await driver.wait.until {
  //
  // }
  // driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
  // await driver.executeScript("console.log(window.location.href)");

  /*
    // choose first trip 
    await driver
      .findElement(By.id("mainTabView:gidisSeferTablosu:0:j_idt117"))
      .click();
  */

  /*   // NEXT PAGE
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await driver.findElement(By.id("mainTabView:btnDevam44")).click();
  
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(await driver.manage().getCookies());
  */
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

  
};
