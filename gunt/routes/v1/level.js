var express = require('express');
var router = express.Router();
var levelModel = require('../../models/level');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Level");
});

router.put('/',function(req,res,next) {
	var level = new levelModel(req.body);
	level.key = md5(level.key);
	
	res.send("Add level")
});

module.exports = router;
