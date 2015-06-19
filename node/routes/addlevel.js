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
    p.password = md5(p.password)
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
                    message: "success"
                });
        });
});

module.exports = router;
