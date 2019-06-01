'use strict';
var nameCmd = 'ident';
var lightController = require('../controllers/LightController');

exports.cmdParser = function() {
	return nameCmd;
};

exports.exec = function(data, mqttClient) {
	console.log('ident[' + data.name + '][' + data.serialId + ']');

	//Update / Create device in DB
	lightController.createUpdateFromIdent(data);
};
