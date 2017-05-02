/**
 * Created by ryadav on 5/2/17.
 */

var Q = require("q");
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'local';
var configs = require('./config/' + env + '.json');

var secretKey = config.secretKey;
var expirationTime = config.token.expirationTime * 60;
module.exports.tokenGenerate = function(user) {
    var token = jwt.sign(user, secretKey);
    return token;
};

module.exports.validateToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: "Failed to Authenticate User"
                });
            } else {
                next();
            }
        });

    } else if (req.path == '/api/user/authenticate') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "No Token Provided"
        });
    }
};