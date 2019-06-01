'use strict';
var nameCmd = 'setMe';
var lightController = require('../controllers/LightController');
var senderMQTT = require('./MqttSender');
var log = require('../utils/log').getLog('mqtt_cmd setMe');

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
			if (data) {
				log.info('client [' + data.name + ']', data);

				//send data from base to lamp
				senderMQTT.sendBrightness(data.id, value, mqttClient);

				var color = {
					r: data.color.r,
					g: data.color.g,
					b: data.color.b
				};
				senderMQTT.sendColor(data.id, color, mqttClient);
				log.info('setMe OK');
			} else {
				log.error('Light not found !');
			}
		})
		.catch((e) => {
			log.error(e);
		});
};
