var express = require('express');
var router = express.Router();
var playerModel = require('../models/player');
var md5 = require('MD5');
var sizeof = require('object-sizeof');

var maxSize = 2500;

router.get('/', function(req, res) {
    res.send('Request method not allowed');
});

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
            res.json({
                code: 0,
                message: player
            });
        } else {
            if (sizeof(p) > maxSize)
                res.json({
                    code: 2,
                    message: 'max input limit exceeded'
                });
            else
                p.save(function(err, p) {
                    if (err)
                        res.json({
                            code: 3,
                            message: err
                        });
                    else
                        res.json({
                            code: 0,
                            message: p
                        });
                });
        }
    });

});

module.exports = router;
