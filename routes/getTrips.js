var express = require("express");
var router = express.Router();
const travel = require("../Middlewares/getTripInfo");
const client = require("../Middlewares/redisClient");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// define main
router.get("/", async (req, res) => {
  try {
    let restf = await travel();
    res.setHeader("Content-Type", "text/json");
    res.send(JSON.stringify(restf));
  } catch (e) {
    res.setHeader("Content-Type", "text/json");
    res.status(500);
    res.send(JSON.stringify({ Error: e.name }));
  }
  // For session
  //   if(req.session.key) {
  //     // if email key is sent redirect.
  //     // res.redirect('/admin');
  //     console.log(req.session);

  // } else {
  //   req.session.key= 'sess';
  //     //   res.json("Oops");
  //     console.log(req.session.id);
  //     try{
  //       let restf = await travel( client);
  //       res.setHeader('Content-Type', 'text/json')
  //       res.send(JSON.stringify(restf));

  //     }
  //     catch(e){
  //       res.setHeader('Content-Type', 'text/json')
  //       res.status(500);
  //       res.send(JSON.stringify({Error:e.name}));
  //     }
  // }
});

module.exports = router;
