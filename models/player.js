var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('md5');

var playerSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0
    },
    normalisedScore: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0,
        index: true
    },
    auth: {
        type: Number,
        default: 0
            // 0 - player
            // 1 - writer
            // 2 - admin
    },
    status: {
        type: Number,
        default: 0
            // 0 - Active
            // 1 - Inactive
            // 2 - Banned
    }
    , created_at    : { type: Date }
    , updated_at    : { type: Date }
    
});


playerSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

playerSchema.pre('update', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

playerSchema.index({
    id: 1
}, {
    unique: true
});

playerSchema.index({
    name: 1
}, {
    unique: true
});

playerSchema.methods.login = function(callback) {
    this.model('player').findOne({
        id: this.id
    }, function(err, player) {
        if (err)
            callback(err);
        else
            callback(err, player);
    });
}
var player = mongoose.model('player', playerSchema);
module.exports = player;
