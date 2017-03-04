var debug=require('debug')('config');
var env = require('node-env');
var dbhost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var dbport = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
var db = 'gunt'
var config = {
    local: {
        port: 5000,
        mongoUrl: 'mongodb://guntUser:guntPassword@ds141209.mlab.com:41209/drishti',
        // mongoUrl: 'mongodb://localhost/gunt',
        serverUrl: 'http://localhost:5000'
    },
    production: {
        port: 5000,
        mongoUrl: 'mongodb://guntUser:guntPassword@ds141209.mlab.com:41209/drishti',
        serverUrl: 'http://localhost:5000'
    }
};

debug('env is ' + env);

module.exports = config[env || 'local'];
