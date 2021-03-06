//Import modules
//Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./api/config.json');
//Init log {bunyan}
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: config.logName });

//Init db (MongoDB)
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongoHost, { useMongoClient: true });

// Check MongoDB connect
var db = mongoose.connection;
db.on('error', (err) => {
	log.error('err mongoDB', err);
});
db.once('open', function() {
	log.info('MongoDB OK');
});

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
var LightModel = require('./api/models/lightModel');

//Load MQTT
var MqttPleiades = require('./api/mqtt/MqttPleiades');
var clientMqtt = MqttPleiades.createClient();

//LoadController

//Load routes server
var RoutesManager = require('./api/routes/RoutesManager');
app.use('/api', RoutesManager.setRouter(express.Router(), MqttPleiades));

app.listen(config.serverPort);
log.info('server listen on port ' + config.serverPort);
