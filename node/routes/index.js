var express = require('express');
var router = express.Router();
var playerModel = require('../models/player');
var sizeof = require('object-sizeof');
var config = require('../config').config[express().get('env')];

var maxSize = 1500;

router.get('/', function(req, res, next) {
    res.send('Easter Egg Hunt')
});

module.exports = router;
