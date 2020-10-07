/*
Documentation website: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html

Useful ressource https://medium.com/@bmshamsnahid/automated-testing-with-selenium-webdriver-and-node-js-f99f64720352
*/
const app = require("express")();
var webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const { Builder, By, Key, until } = require("selenium-webdriver");
const redis = require("redis");
// const client = redis.createClient();
const { promisify } = require("util");

var getTrips = require('./routes/getTrips');

var options = new chrome.Options();
options.addArguments("--headless");
const screen = {
  width: 640,
  height: 480,
};

app.use('/api', getTrips);


app.listen("3000", () => {
  console.log("Server running");
});

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless().windowSize(screen)) // just change with new chrome.Options().headless().windowSize(screen)
  .build();
