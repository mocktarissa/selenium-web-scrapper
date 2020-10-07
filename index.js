/*
Documentation website: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html

Useful ressource https://medium.com/@bmshamsnahid/automated-testing-with-selenium-webdriver-and-node-js-f99f64720352
*/
const app = require("express")();


const { promisify } = require("util");

var getTrips = require('./routes/getTrips');
let chooseTrip= require('./routes/chooseTrip');


app.use('/api', getTrips);

app.use('/choose', chooseTrip)

app.listen("3000", () => {
  console.log("Server running");
});
