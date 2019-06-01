'use strict';
var nameCmd = 'ident';
var lightController = require('../controllers/LightController');
var log = require('../utils/log').getLog('mqtt_cmd ident');

exports.cmdParser = function() {
	return nameCmd;
};

exports.exec = function(data, mqttClient) {
	//Update / Create device in DB
	lightController.createUpdateFromIdent(data);
};
