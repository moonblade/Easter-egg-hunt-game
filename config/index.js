var debug=require('debug')('config');
var env = require('node-env');
var config = {
    local: {
        port: 3000,
        mongoUrl: 'mongodb://localhost/gunt',
        serverUrl: 'http://localhost:3000'
    },
    production: {
        port: 3000,
        mongoUrl: 'mongodb://localhost/gunt',
        serverUrl: 'http://localhost:3000'
    }
};

debug('env is ' + env);

module.exports = config[env || 'local'];
