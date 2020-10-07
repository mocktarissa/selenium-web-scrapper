let express = require('express')
let router = express.Router()
const travel = require('../Middlewares/getTripInfo')
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.use(express.urlencoded({
    extended: true
  }));
// define main
router.get("/", async (req, res) => {
    
console.log(req.body);  
res.send(JSON.stringify(req.body));
      });
  
  
module.exports = router