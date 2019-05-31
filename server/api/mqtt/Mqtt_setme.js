'use strict';
var nameCmd = 'setMe';
var lightController = require('../controllers/LightController');
var senderMQTT = require('./MqttSender');

/*
** SetMe force server to synchronise device with DB
*/

exports.cmdParser = function() {
	return nameCmd;
};

exports.exec = function(msgData, mqttClient) {
	//Find device with DeviceID
	var did = '32-0498';
	lightController
		.getLightDeviceId(did)
		.then((data) => {
			console.log('client [' + data.name + '] => [' + nameCmd + ']');

			//send data from base to lamp
			senderMQTT.sendBrightness(data.id, value, mqttClient);

			var color = {
				r: data.color.r,
				g: data.color.g,
				b: data.color.b
			};
			senderMQTT.sendColor(data.id, color, mqttClient);
			console.log('setMe OK');
		})
		.catch((e) => {
			console.log('erreur [' + nameCmd + '] [' + e + ']');
		});
};
