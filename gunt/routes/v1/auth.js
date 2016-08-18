var debug = require('debug')('auth');

exports.admin = function(req, res, next) {
    debug(req.body)
    unauthorized = function(err) {
        return res.status(401).send({
            "message": "Unauthorized access" + (err ? " - " + err : "")
        });
    }
    if (!req.body.user)
        return unauthorized();
    if (req.body.user.id == "791a4270d908c5d131e59f4ee95b9f4a")
        return next();
    return unauthorized();
}
