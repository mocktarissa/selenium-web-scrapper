let express = require('express')
let router = express.Router()

const travel = require('../Middlewares/chooseTrip')
const client = require('../Middlewares/redisClient')
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// adding x-www-form-urlencoded to the router
router.use(express.urlencoded({
    extended: true
  }));
// define main
router.get("/", async (req, res) => {
  await travel(client);
  req.session.destroy(function(err){
    if(err){
        console.log(err);
    } else {
        // res.redirect('/');
    }
});
console.log(req.body);  


res.send(JSON.stringify(req.body));
      });
  
  
module.exports = router