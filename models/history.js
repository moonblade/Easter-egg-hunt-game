var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var md5 = require('md5');
mongoose.Promise = global.Promise;

var historySchema = mongoose.Schema({
    level: {
        type: Number,
    },
    player: {
        type: String,
    }
    , created_at    : { type: Date }
    , updated_at    : { type: Date }
    
});


historySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

var history = mongoose.model('history', historySchema);
module.exports = history;
