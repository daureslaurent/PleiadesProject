'use strict';
var mongoose = require('mongoose');
var LightDB = mongoose.model('Light');

exports.getListLight = function() {
	return new Promise((resolve, reject) => {
		LightDB.find({})
			.exec()
			.then((listData) => {
				resolve(listData);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.getLightId = function(id) {
	return new Promise((resolve, reject) => {
		LightDB.findById(id)
			.exec()
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.getLightDeviceId = function(id) {
	return new Promise((resolve, reject) => {
		LightDB.find({ deviceId: id })
			.exec()
			.then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.setColor = function(id, color) {
	var tmpColor = { r: ~~color.r, g: ~~color.g, b: ~~color.b };
	return new Promise((resolve, reject) => {
		LightDB.update({ _id: id }, { $set: { color: tmpColor } })
			.exec()
			.then((data) => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.setBrightness = function(id, brightness) {
	return new Promise((resolve, reject) => {
		LightDB.update({ _id: id }, { $set: { brightness: brightness } })
			.exec()
			.then((data) => {
				resolve();
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.createUpdateFromIdent = function(identData) {
	var serialId = identData.serialId;

	// find an existing Light with same deviceId
	LightDB.findOne({ deviceId: serialId }, function(err, light) {
		if (err) {
			console.log('Err update_Light_from_ident: ' + err);
		}
		if (light) {
			//Update Light
			var color = identData.led.color;
			light.color = color;
			light.lastUpTime = Date.now();

			light.save(function(err, light) {});
		} else {
			// New Light
			console.log('Create new light ' + identData.name);
			var newLight = new LightDB();
			newLight.name = identData.name;
			newLight.deviceId = serialId;
			newLight.color = identData.led.color;
			newLight.brightness = 30;
			newLight.lastUpTime = Date.now();

			newLight.save(function(err, Light) {
				if (err) console.log('Err create new Light: ' + err);
				console.log('create new Light OK: ' + Light.name);
			});
		}
	});
};
