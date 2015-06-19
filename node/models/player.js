var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('MD5');

var projection = {
    // password:0
}

var playerSchema = mongoose.Schema({
    id : {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    }
});

playerSchema.index({
    id: 1
}, {
    unique: true
});

playerSchema.methods.login = function(callback){
    this.model('player').findOne({
        id: this.id
    }, function(err,player){
        if(err)
            callback(err);
        else
            callback(err, player);
    });
}
var player = mongoose.model('player', playerSchema);
module.exports = player;
 