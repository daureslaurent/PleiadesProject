'use strict';
var mongoose = require('mongoose');
var LightDB = mongoose.model('Light');

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
