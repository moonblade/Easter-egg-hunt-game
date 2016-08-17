var express = require('express');
var router = express.Router();
var levelModel = require('../../models/level');
var md5 = require('md5')
var debug = require('debug')('level');
/* GET home page. */
router.get('/', function(req, res, next) {
    levelModel.findOne(req.query).exec().then(function(foundLevel) {
        debug("got here");
        res.send(foundLevel);
    }).catch(function(error) {
        debug("got here2");
        res.status(500).send(error);
    })
    res.send("Level");
});

router.put('/', function(req, res, next) {
    var level = new levelModel(req.body);
    level.key = md5(level.key);
    debug(level)
    level.save();
    // var promise = level.save();
    // promise.then(function(level){
    // 	debug(level);
    // 	debug("Asdfsfsdfsfd");
    // }).catch(function(error){
    // 	debug(error);
    // 	debug("Asdfsf");
    // });
    // level.find().then(function(foundLevel) {
    //     debug("got here");
    //     debug(foundLevel);
    //     return level.save();
    // }).then(function(level) {
    //     debug("got here1");
    //     debug("updated level " + level.level);
    // }).catch(function(error) {
    //     debug("got here2");
    //     debug(error);
    // })

    res.send("Add level")
});

module.exports = router;
