'use strict';

var log = require('../utils/log').getLog('lightRoutes');

module.exports = function(mqttClient) {
	var routesList = new Array();

	var LightController = require('../controllers/LightController');
	//setColor
	var _funcSetColor = function(req, res) {
		var rgb = { r: req.body.r, g: req.body.g, b: req.body.b };
		var id = req.body.id;

		//update DB color
		LightController.setColor(id, rgb)
			.then(() => {
				mqttClient.sendColor(id, rgb);
				res.status(204).send();
			})
			.catch((err) => {
				console.log('err');
				res.status(500).send();
			});
	};
	routesList.push({
		path: 'set_color',
		funct: _funcSetColor,
		mode: 'post'
	});

	//SetBrigthness
	var _funcSendBrightness = function(req, res) {
		var brightness = req.body.brightness;
		var id = req.body.id;

		//Update DB brigtness
		LightController.setBrightness(id, brightness)
			.then(() => {
				mqttClient.sendBrightness(id, brightness);
				res.status(204).send();
			})
			.catch((err) => {
				console.log('err');
				res.status(500).send();
			});
	};
	routesList.push({
		path: 'set_brightness',
		funct: _funcSendBrightness,
		mode: 'post'
	});

	//SetPower

	return routesList;
};
