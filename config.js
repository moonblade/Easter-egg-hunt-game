var config = {
    development: {
        dbHost: 'mongodb://localhost/gunt',
        versionDetails: {
            code: 1,
            info: 'Development version',
            forceUpdate: true
        }
    },
    production: {
        dbHost: 'mongodb://localhost/gunt',
        versionDetails: {
            code: 2,
            info: 'Release Version',
            forceUpdate: true
        }
    }
}
exports.config = config;
