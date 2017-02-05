var debug=require('debug')('config');
var env = require('node-env');
var dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var db = 'gunt'
var config = {
    local: {
        port: 3000,
        mongoUrl: 'mongodb://localhost/gunt',
        serverUrl: 'http://localhost:3000'
    },
    production: {
        port: 3000,
        mongoUrl: 'mongodb://guntUser:guntPassword@ds141209.mlab.com:41209/drishti',
        serverUrl: 'http://localhost:3000'
    }
};

debug('env is ' + env);

module.exports = config[env || 'local'];
