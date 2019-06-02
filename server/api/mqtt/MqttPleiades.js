'use strict';
const mqtt = require('mqtt');
//const rgbHex = require('rgb-hex');
const config = require('../config');
const senderMQQT = require('./MqttSender');
const LightController = require('../controllers/LightController');
const UpdateStatus = require('../utils/UpdateStatus');
var log = require('../utils/log').getLog('MqttPleiades');
var client;

exports.sendColor = function(id, color) {
	senderMQQT.sendColor(id, color, client);
};

exports.sendBrightness = function(id, value) {
	senderMQQT.sendBrightness(id, value, client);
};

exports.createClient = function() {
	var topicServer = 'ledlamp/server';
	var topicControl = 'ledlamp/ctrl';

	//CMD MQTT
	var cmdList = new Array();
	cmdList.push(require('./Mqtt_ident'));
	cmdList.push(require('./Mqtt_setme'));

	client = mqtt.connect(config.MQTTBroker);

	client.on('connect', function() {
		//Subscribe topic
		client.subscribe(topicServer);
		client.subscribe(topicControl);
		log.info('connected & subscribe');
	});

	client.on('message', function(topic, message) {
		//log.info('msg MQTT', topic);
		if (topicServer === topic) {
			try {
				var data = JSON.parse(message);
				cmdList.forEach((element) => {
					if (data.cmd === element.cmdParser()) {
						//log.info('[' + data.cmd + ']:[' + data.name + '][' + data.serialId + ']');
						element.exec(data, client);
					}
				});
				//Update state {conected} of device
				LightController.updateTimeUp(data.serialId);
			} catch (e) {
				log.error(e);
			}
		}
	});

	var functAutoSendIdent = function() {
		senderMQQT.sendIdent(client);
		setTimeout(() => {
			UpdateStatus.updateStatus();
		}, 3 * 1000);
	};
	setInterval(functAutoSendIdent, 10 * 1000);

	return client;
};
