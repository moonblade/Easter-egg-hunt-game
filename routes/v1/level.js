var express = require('express');
var router = express.Router();
var levelModel = require('../../models/level');
var md5 = require('md5');
var debug = require('debug')('level');
var constant = require('../../config/constant');
var auth = require('./auth');
/* GET home page. */
function e(errMsg) {
    return {
        error: errMsg
    };
}
router.get('/', function(req, res, next) {
    levelModel.findOne({level : req.query.level}).exec().then(function(foundLevel) {
        res.send(foundLevel);
    }).catch(function(error) {
        res.status(constant.serverError).send(e(error));
    })
});

router.delete('/', function(req, res, next) {
    var level = req.body.level;
    levelModel.remove(level)
        .then(function(level) {
            return res.json(constant.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        })
});

router.put('/', function(req, res, next) {
    var level = req.body.level;
    level.key = md5(level.key);
    debug(level);
    levelModel.update({
            "level": level.level
        }, {
            $set: level
        }, {
            upsert: true
        })
        .exec()
        .then(function(level) {
            return res.json(constant.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        });
});

module.exports = router;
