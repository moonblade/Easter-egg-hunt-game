var express = require('express');
var router = express.Router();
var debug = require('debug')('player');
var md5 = require('md5');
var playerModel = require('../../models/player');
var levelModel = require('../../models/level');
var constant = require('../../config/constant');
var auth = require('./auth');

function e(errMsg) {
    return {
        error: errMsg
    };
}

router.get('/', function(req, res, next) {
    playerModel.findOne({
        id: req.query.id
    }).exec().then(function(foundPlayer) {
        res.send(foundPlayer);
    }).catch(function(error) {
        res.status(constant.serverError).send(e(error));
    })
});

router.delete('/', function(req, res, next) {
    var player = req.body.player;
    playerModel.remove(player)
        .then(function(player) {
            return res.json(constant.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        })
});

router.put('/', function(req, res, next) {
    var player = new playerModel(req.body.player);
    debug(player);
    // Apparently promise violates "unique" rules and creates a copy, weird
    player.save(function(error) {
        if (error)
            return res.status(constant.serverError).send(e(error));
        return res.json(constant.successMessage);
    });
});

module.exports = router;
