var express = require('express');
var router = express.Router();
var playerModel = require('../../models/player');
var constant = require('../../config/constant');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Gunt backend");
});

router.get('/logoandlink', function(req, res, next) {
    
});
/**
 * @api {get} /scoreBoard get Score Board
 * @apiSuccessExample {json} success
 *  {
 *  	code : "0",
 *  	scoreBoard : [
 *  		{	
 *  			"id" : 1,
 *  			"name" : "testName",
 *  			"score" : 10000
 *  		},
 *  	 	{	
 *  			"id" : 2,
 *  			"name" : "testName2",
 *  			"score" : 5000
 *  		},
 *  			
 *  	]
 *  }
 * @apiGroup score
 * @apiVersion 0.1.0
 */
router.get('/scoreBoard', function(req, res, next) {
    playerModel.find({
            auth: 0
        }).sort({
            level: -1,
            updated_at: -1,
            normalisedScore: -1
        })
        .exec()
        .then(function(playerList) {
            toAdd = Math.max(10 - playerList.length, 0);
            for (var i = 0; i < toAdd; ++i) {
                playerList.push({
                    id: "007",
                    name: "MB",
                    score: "000000",
                    level: "0",
                    auth: "0",
                    status: "0"
                });
            }
            return res.json({
                code: constant.codes.successCode,
                scoreBoard: playerList
            });
        }).catch(function(error) {
            return res.status(constant.serverError).send(e(error));
        })
});
module.exports = router;
