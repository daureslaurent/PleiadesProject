'use strict';
const mqtt = require('mqtt');
//const rgbHex = require('rgb-hex');
const config = require('../config');
const senderMQQT = require('./MqttSender');
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

	client = mqtt.connect(config.MQTTBroker);

	client.on('connect', function() {
		//Subscribe topic
		client.subscribe(topicServer);
		client.subscribe(topicControl);
	});

	client.on('message', function(topic, message) {
		console.log(topic, message);
		if (topicServer === topic) {
			try {
				var data = JSON.parse(message);
				cmdList.forEach((element) => {
					if (data.cmd === element.cmdParser()) {
						element.exec(data);
					}
				});
			} catch (e) {
				console.error(e);
			}
		} else console.log('topic: ' + topic + ' msg: ' + message.toString());
	});
	return client;
};
