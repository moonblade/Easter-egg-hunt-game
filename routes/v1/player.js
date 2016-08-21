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

/**
 * @api {get} /player get player
 * @apiParam {String} id id of the player to get
 * @apiSuccessExample {json} success
 *  {
 *   "_id": "57b9454c6ba8386c2ca2926c",
 *   "id": 65432,
 *   "name": "testName",
 *   "__v": 0,
 *   "status": 0,
 *   "auth": 0,
 *   "level": 0,
 *   "score": 0
 *  }
 * @apiGroup player
 */
router.get('/', function(req, res, next) {
    playerModel.findOne({
        id: req.query.id
    }).exec().then(function(foundPlayer) {
        if (foundPlayer.status == constant.playerStatus.banned || foundPlayer.status == constant.playerStatus.inactive)
            res.status(401).send(e(constant.codes.playerNotActive));
        else
            res.send(foundPlayer);
    }).catch(function(error) {
        res.send();
        // res.status(constant.serverError).send(e(error));
    })
});

/**
 * @api {delete} /player delete player
 * @apiParamExample {json} request
 * {
 *   player: {
 *       id: "654321",
 *   },
 *   user: {
 *       id: "791a4270d908c5d131e59f4ee95b9f4a"
 *   }
 * }
 * @apiSuccessExample {josn} success
 * {
 *      "code" : 0,
 *      "message": "Success"
 * }
 * @apiGroup player
 */
router.delete('/', auth.admin, function(req, res, next) {
    var player = req.body.player;
    playerModel.remove(player)
        .then(function(player) {
            return res.json(constant.codes.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        })
});

/**
 * @api {put} /player put player
 * @apiParamExample {json} request
 * {
 *   player: {
 *       id: "654321",
 *       name: "testName",
 *   }
 * }
 * @apiSuccessExample {josn} success
 * {
 *      "code" : 0,
 *      "message": "Success"
 * }
 * @apiGroup player
 */
router.put('/', function(req, res, next) {
    var player = new playerModel(req.body.player);
    debug(player);
    // Apparently promise violates some rules and creates a copy, weird
    player.save(function(error) {
        if (error)
            return res.status(constant.serverError).send(e(error));
        return res.json(constant.codes.successMessage);
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
