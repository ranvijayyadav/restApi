/**
 * Created by ryadav on 4/30/17.
 */
var express = require('express');
var app = express();
var router = express.Router();
var env = process.env.NODE_ENV || 'local';
var configs = require('./config/' + env + '.json');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, accept, token');
    next();
};

app.use(allowCrossDomain);


//require('./services/global-user-service/routes.js')(app, router);
//require('./services/module-service/routes.js')(app, router);

app.use('/api', router);

var port = configs.port;

app.listen(port, function() {
    console.log('Server started on port '+ port);
});
