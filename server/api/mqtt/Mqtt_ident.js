'use strict';
var nameCmd = 'ident';

exports.cmdParser = function() {
	return nameCmd;
};

exports.exec = function(data, mqttClient) {
	console.log('ident[' + data.name + '][' + data.serialId + ']');
	var color = data.led.color;
	//TODO: update light in database
};
