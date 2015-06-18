var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var program = require('commander')
var routes = require('./routes/index');
var db = mongoose.connection;
var app = express();
var config = require('./config').config[app.get('env')];

program
    .version('0.0.1')
    .option('-p --port <number>', "Port", parseInt)
    .parse(process.argv)

var PORT = program.port || process.env.PORT || 3000;
console.log('env = ' + app.get('env'));

mongoose.connect(config.dbHost);
db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function(callback) {
    console.log('connected to ' + config.dbHost);
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(routes);

app.use(function(err, req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            code: res.status,
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        code: res.status,
        message: err.message,
    });
});

app.listen(PORT, function() {
    console.log('Server listening at ' + PORT);
});
module.exports = app;
