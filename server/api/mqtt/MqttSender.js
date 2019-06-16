'use strict';

exports.sendColor = function(id, color, mqtt) {
	if (color != null || color != undefined) {
		var fadingTime = 300;
		var jsonData = { cmd: 'setColor', data: { color: { r: color.r, g: color.g, b: color.b }, fade: fadingTime } };
		mqtt.publish('ledlamp/json', JSON.stringify(jsonData));
	}
};

exports.sendBrightness = function(id, brightness, mqtt) {
	if (brightness != null || brightness != undefined) {
		var jsonData = { cmd: 'setBrightness', data: { brightness: brightness } };
		mqtt.publish('ledlamp/json', JSON.stringify(jsonData));
	}
};

exports.sendPower = function(id, power, mqtt) {
	if (power != null || power != undefined) {
		var jsonData = { cmd: 'setPower', data: { power: power } };
		mqtt.publish('ledlamp/json', JSON.stringify(jsonData));
	}
};

exports.sendIdent = function(mqtt) {
	mqtt.publish('ledlamp/set', 'ident');
};
