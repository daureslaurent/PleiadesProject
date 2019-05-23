//Import modules
//Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./api/config.json');
//Init log {bunyan}
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'Pleiades-server' });

//Init db (MongoDB)

//midleWare
app.use(express.static('public'));
app.use(session({ secret: config.keySession }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//inject header Access-Control-Allow-*** (client-use)
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	next();
});

//LoadModel DB

//LoadController

//Load routes server

app.listen(config.serverPort);
