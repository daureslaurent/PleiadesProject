'use strict';
var mongoose = require('mongoose');

var LightSchema = new mongoose.Schema({
	//Info
	name: {
		type: String,
		required: true
	},
	power: Boolean,
	connected: {
		type: Boolean
	},
	lastUpTime: Number,
	ssid: {
		signal: Number,
		name: String
	},
	// LED
	brightness: Number,
	color: {
		r: Number,
		g: Number,
		b: Number
	},
	mode: {
		type: String
	}
});

module.exports = mongoose.model('Player', PlayerSchema);
