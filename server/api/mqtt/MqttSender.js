'use strict';

exports.sendColor = function(id, color, mqtt) {
	if (color != null || color != undefined) {
		var jsonData = { cmd: 'setColor', data: { color: { r: color.r, g: color.g, b: color.b }, fade: 0 } };
		mqtt.publish('ledlamp/json', JSON.stringify(jsonData));
	}
};

exports.sendBrightness = function(id, brightness, mqtt) {
	if (brightness != null || brightness != undefined) {
		var jsonData = { cmd: 'setBrightness', data: { brightness: brightness } };
		mqtt.publish('ledlamp/json', JSON.stringify(jsonData));
	}
};
