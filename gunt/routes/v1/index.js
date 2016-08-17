var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Gunt");
});


router.put('/addUser',function(req, res, next) {
	
});

module.exports = router;
