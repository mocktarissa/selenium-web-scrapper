var express = require('express')
var router = express.Router()
const travel = require('../Middlewares/getTripInfo')
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define main
router.get("/", async (req, res) => {
    //   res.json("Oops");
    let restf = await travel();
    res.setHeader('Content-Type', 'text/json')
    res.send(JSON.stringify(restf));
  
    //connect to the reddis client
    //   client.on("error", function (error) {
    //     console.error(error);
    //   });
    /*
      Assign a session cookie to the user 
      Map that session cookie with the one from the browser driver 
      Store that mapped value in reddis  
      */
    //    client.set("key", "value", redis.print);
    //   client.get("key", redis.print);
    // Retrieve the cookies from the previous session
    // driver.manage().getCookies();
    // after the choice on the UI make a request to the page and then set the cookie as the one stored for that secific user
    // driver.manage().addCookie(arg0);
  });
  
  
module.exports = router