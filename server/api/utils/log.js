'use strict';

var config = require('../config.json');
var bunyan = require('bunyan');

exports.getLog = function(subName) {
	var log = bunyan.createLogger({ name: config.logName, sub: subName });
	return log;
};
