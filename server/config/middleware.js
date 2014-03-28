var	express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./');
var secret = require('./secret');
var expressJwt = require('express-jwt');
var lessMiddleware = require('less-middleware');
var path = require('path');

module.exports = function(app) {
	app.use(lessMiddleware(path.join(__dirname, '../../public')));



	app.use(function(req, res, next) {
		if (config.log) {
			console.log(req.url);
		}
		next();
	});

	// static pages (to serve angular files)
	app.use(express.static('../public/'));

	app.use(express.json());
	app.use(express.urlencoded());		
	app.use(express.multipart());

	// to emulate delete and put requests
	app.use(express.methodOverride());	

	////
	// implement your own passport strategy here.
	////
	passport.use(
	  new LocalStrategy(function(username, password, done) {
		if (password === secret.password) {
			return done(null, {name: 'User'});
		}
		return done(null, false);
	}));
	
	// initializes passport auth system
	app.use(passport.initialize());
	// this will set the req.user object for authenticated API calls
	app.use(config.routes.secure_api, expressJwt({secret: secret.key}));

	app.use(app.router);
}