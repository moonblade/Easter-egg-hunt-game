var express = require('express');
var router = express.Router();
var levelModel = require('../models/level');
var md5 = require('MD5');
var sizeof = require('object-sizeof');

var maxSize = 2500;

router.get('/', function(req, res) {
    res.nd('Request method not allowed');
});

router.post('/', function(req, res) {
    p = new levelModel(req.body);
    p.key=md5(p.key);
    p.find(function(err, level) {
        if (err) {
            res.json({
                code: 10,
                message: err
            });
        } else if (level) {
            var temp=level;
            for (k in req.body) {
                level[k] = req.body[k];
            }
            level.key=md5(level.key);
            level.save(function(err){
                if (err)
                    res.json({
                        code:11,
                        message: err
                    });
                else
                    res.json({
                        code: 0,
                        message: 'level updated'
                    });
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
                            message: "level inserted"
                        });
                });
        }
    });

});

module.exports = router;
