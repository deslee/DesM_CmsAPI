var	http = require('http');
var express = require('express');
var app = express();
var configure_middleware = require('./config/middleware');
var configure_routes = require('./config/routes');

configure_middleware(app);
configure_routes(app);

////
//	This route will redirect any traffic to the index file (for angular to handle).
////
app.use(function(req, res, next) {
    res.redirect(req.protocol + '://' + req.get('Host') + '/#' + req.url)
});

httpServer = http.createServer(app),
httpServer.listen(8000);