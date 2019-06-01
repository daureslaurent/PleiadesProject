'use strict';

var LightController = require('../controllers/LightController');
var log = require('../utils/log').getLog('UpdateStatus');

exports.updateStatus = function() {
	var now = Date.now();

	//Get list of all light
	LightController.getListLight().then((dataList) => {
		dataList.forEach((element) => {
			//Check last timeUp
			element.connected = now - element.lastUpTime < 20 * 1000;
			element.save((err, Light) => {
				if (err) log.error('Err save connected', err);
			});
		});
	});
};
