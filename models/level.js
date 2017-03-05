var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('md5');
mongoose.Promise = global.Promise;

var levelSchema = mongoose.Schema({
    level: {
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    text: {
        type : String   
    },
    key: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    basescore: {
        type: Number,
        required: true
    }
});


levelSchema.methods.find = function() {
    return this.model('level').findOne({
        level: this.level
    }).exec();
}

levelSchema.methods.view = function(callback) {
    this.model('level').find(function(err, level) {
        if (err)
            callback(err);
        else
            callback(err, level);
    });
}


var level = mongoose.model('level', levelSchema);
module.exports = level;
