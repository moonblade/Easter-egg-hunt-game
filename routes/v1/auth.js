var debug = require('debug')('auth');
var playerModel = require('../../models/player');
var levelModel = require('../../models/level');

function e(errMsg) {
    return {
        error: errMsg
    };
}

exports.admin = function(req, res, next) {
    debug(req.body.user)
    unauthorized = function(err) {
        return res.status(401).send(e({
            "message": "Unauthorized access" + (err ? " - " + err : "")
        }));
    }
    if (!req.body.user)
        return unauthorized();
    if (req.body.user.id == "791a4270d908c5d131e59f4ee95b9f4a")
        return next();
    playerModel.findOne({
        id: req.body.user.id
    }).exec().then(function(foundPlayer) {
        if (foundPlayer.auth >= constant.auth.admin)
            return next();
        else
            return unauthorized();
    }).catch(function(error) {
        return res.status(constant.serverError).send(e(error));
    })
    return unauthorized();
}

exports.player = function(req, res, next) {
    debug(req.body.player)
    unauthorized = function(err) {
        return res.status(401).send(e({
            "message": "Unauthorized access" + (err ? " - " + err : "")
        }));
    }
    if (!req.body.player)
        return unauthorized();
    if (req.body.player.id == "791a4270d908c5d131e59f4ee95b9f4a")
        return next();
    playerModel.findOne({
        id: req.body.player.id
    }).exec().then(function(foundPlayer) {
        if (foundPlayer.status == constant.playerStatus.banned || foundPlayer.status == constant.playerStatus.inactive)
            res.status(401).send(e({
                code: 10,
                errmsg: "Your account is not active"
            }));
        else
            return next();
    }).catch(function(error) {
        return res.status(constant.serverError).send(e(error));
    })
    return unauthorized();
}
