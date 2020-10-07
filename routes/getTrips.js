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
    // res.redirect('/choose');
    res.send(JSON.stringify(restf));
  
    //connect to the reddis client
    //   client.on("error", function (error) {
    //     console.error(error);
    //   });
    
  });
  
  
module.exports = router