var express = require('express');
var router = express.Router();
var playerModel = require('../models/player');
var levelModel = require('../models/level');
var md5 = require('MD5');
var sizeof = require('object-sizeof');

var maxSize = 2500;

router.get('/', function(req, res) {
    res.send('Request method not allowed');
});

// 6 7 and 8 are checked simultaneously
router.post('/', function(req, res) {
    p = new playerModel(req.body);
    p.password = md5(p.password);
    p.login(function(err, player) {
        if (err) {
            res.json({
                code: 3,
                message: err
            });
        } else if (player) {
            var curLevel = player.level;
            l = new levelModel({
                level: curLevel
            });
            l.find(function(err, level) {
                if (err) {
                    res.json({
                        code: 12,
                        message: err
                    });
                } else if (level) {
                    if (curLevel < 6 || curLevel > 8) {
                        var answer = md5(req.body.answer);
                        if (answer == level.key) {
                            player.level = player.level + 1;
                            player.save(function(err) {
                                if (err)
                                    res.json({
                                        code: 16,
                                        message: err
                                    });
                                else
                                    res.json({
                                        code: 0,
                                        message: 'correct answer'
                                    });
                            });
                        } else {
                            res.json({
                                code: 13,
                                message: 'wrong answer'
                            });
                        }
                    } else {
                        var answer1 = md5(req.body.answer1);
                        var answer2 = md5(req.body.answer2);
                        var answer3 = md5(req.body.answer3);
                        var correct = 0;
                        // correct = 1 - 7 for correct answers permutations for answer 1 2 3
                        l2 = new levelModel({
                            level: curLevel+1
                        });
                        l3 = new levelModel({
                            level: curLevel+2
                        });
                        l2.find(function(err,level2){
                            if (err)
                                res.json({
                                    code: 17,
                                    message: err
                                });
                            else if (level2){
                                l3.find(function(err,level2){
                                    if (err)
                                        res.json({
                                            code: 18,
                                            message: err
                                        });
                                    else if (level2){

                                    }
                                    else
                                        res.json({
                                            code: 20,
                                            message: 'could not find level'
                                        });
                                })
                            }
                            else
                                res.json({
                                    code: 19,
                                    message: 'could not find level'
                                })
                        })

                        if (answer1 == level.key)
                            correct = correct + 1;
                        if (answer2 == level.key)
                            correct = correct + 2;
                        if (answer3 == level.key)
                            correct = correct + 4;
                        res.json({
                            code: 0,
                            message: correct
                        });
                    }
                } else {
                    res.json({
                        code: 14,
                        message: 'could not find level'
                    });
                }
            });
        } else {
            res.json({
                code: 15,
                message: 'not logged in'
            })
        }
    });

});

module.exports = router;
