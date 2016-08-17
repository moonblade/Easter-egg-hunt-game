var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("User");
});

router.put('/',function(req,res,next) {
	res.send("adduser")
});

module.exports = router;
