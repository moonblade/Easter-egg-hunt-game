var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('md5');

var levelSchema = mongoose.Schema({
    level : {
        type: Number,
        unique: true,
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


levelSchema.index({
    id: 1
}, {
    unique: true
});

levelSchema.methods.find = function(callback){
    this.model('level').findOne({
        level: this.level
    }, function(err,level){
        if(err)
            callback(err);
        else
            callback(err, level);
    });
}

levelSchema.methods.view = function(callback){
    this.model('level').find(function(err,level){
        if(err)
            callback(err);
        else
            callback(err, level);
    });
}


var level = mongoose.model('level', levelSchema);
module.exports = level;
 