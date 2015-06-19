var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('MD5');

var projection = {
    // password:0
}

var levelSchema = mongoose.Schema({
    level : {
        type: Number,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    basescore: {
        type: Number,
        required: true
    },
    num: {
        type: Number,
        default: 0
    }
});

var level = mongoose.model('level', levelSchema);
module.exports = level;
 