'use strict';
const LightReduced = require('./LightReduced.js');
module.exports = function(rawList) {
	//final obj
	var final = new Array();

	rawList.forEach((element) => {
		final.push(LightReduced(element));
	});

	return final;
};
