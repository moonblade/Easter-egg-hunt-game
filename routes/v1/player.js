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
        if (foundPlayer.status == constant.playerStatus.banned || foundPlayer.status == constant.playerStatus.inactive)
            res.status(401).send(e(constant.codes.playerNotActive));
        else
            res.send(foundPlayer);
    }).catch(function(error) {
        res.status(constant.serverError).send(e(error));
    })
});

router.delete('/', auth.admin, function(req, res, next) {
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

router.post('/checkAnswer', auth.player, function(req, res, next) {
    var answer = md5(req.body.answer);
    var player = req.body.player;
    playerModel.findOne({
        id: req.body.player.id
    }).exec().then(function(foundPlayer) {
        if (foundPlayer) {
            levelModel.findOne({
                level: foundPlayer.level
            }).exec().then(function(foundLevel) {
                if (answer == foundLevel.key) {
                    // TODO update level of user and return true
                } else {
                    return res.json(constant.codes.wrongAnswer);
                }
            }).catch(function(error) {
                return res.status(constant.serverError).send(e(error));
            });
        } else
            return res.status(constant.serverError).send(e(constant.codes.noPlayerFound));
    }).catch(function(error) {
        return res.status(constant.serverError).send(e(error));
    })

});

module.exports = router;
