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

/**
 * @api {post}  /level get level
 * @apiParamExample {json} request
 * {
 *   level: {
 *       level: 101,
 *   },
 *   user: {
 *       id: "791a4270d908c5d131e59f4ee95b9f4a"
 *   }
 * }
 * @apiSuccessExample {json} success
 * {
 *    "_id": "57b92c66ec186bcd4b21de5e",
 *    "level": 1,
 *    "key": "791a4270d908c5d131e59f4ee95b9f4",
 *    "basescore": 5000,
 *    "num": 0
 *  }
 *  @apiErrorExample {json} unauthorized error
 *  {
 *    "error": {
 *      "message": "Unauthorized access"
 *    }
 *  }
 *  @apiGroup level
 *  @apiVersion 0.1.0
 */
router.post('/', auth.admin, function(req, res, next) {
    levelModel.findOne(req.body.level)
        .exec().then(function(foundLevel) {
            res.send(foundLevel);
        }).catch(function(error) {
            res.status(constant.serverError).send(e(error));
        })
});

/**
 * @api {delete} /level delete level
 * @apiParamExample {json} request
 * {
 *   level: {
 *       level: 101,
 *   },
 *   user: {
 *       id: "791a4270d908c5d131e59f4ee95b9f4a"
 *   }
 * }
 * @apiSuccessExample {json} success
 * {
 *      "code" : 0,
 *      "message": "Success"
 * }
 * @apiGroup level
 * @apiVersion 0.1.0
 */
router.delete('/', auth.admin, function(req, res, next) {
    var level = req.body.level;
    levelModel.remove(level)
        .then(function(level) {
            return res.json(constant.codes.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        })
});

/**
 * @api {put} /level put level
 * @apiParamExample {json} request
 * {
 *  level: {
 *      level: 101,
 *      key: "testKey",
 *      basescore: 5000
 *  },
 *  user: {
 *      id: "791a4270d908c5d131e59f4ee95b9f4"
 *  }
 * }
 *
 * @apiSuccessExample {json} success
 * {
 *      "code" : 0,
 *      "message": "Success"
 * }
 * @apiGroup level
 * @apiVersion 0.1.0
 */
router.put('/', auth.admin, function(req, res, next) {
    var level = req.body.level;
    level.key = md5(level.key);
    debug("level",level);
    levelModel.update({
            "level": level.level
        }, {
            $set: level
        }, {
            upsert: true
        })
        .exec()
        .then(function(level) {
            console.log(constant.codes);
            return res.json(constant.codes.successMessage);
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        });
});

module.exports = router;
