/*
Documentation website: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html

Useful ressource https://medium.com/@bmshamsnahid/automated-testing-with-selenium-webdriver-and-node-js-f99f64720352
*/
const app = require("express")();


const { promisify } = require("util");

var getTrips = require('./routes/getTrips');
let chooseTrip= require('./routes/chooseTrip');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session')
//
var redisStore = require('connect-redis')(session);
const client = require('./Middlewares/redisClient')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  genid: function(req) {
    return  uuidv4(); // use UUIDs for session IDs
  },
  resave: false,
  secret: 'cookie for choosing trip',
  name:'tcdd',
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260})
  
}))


// session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }
app.use('/api', getTrips);

app.use('/choose', chooseTrip)

app.listen("3000", () => {
  console.log("Server running");
});
