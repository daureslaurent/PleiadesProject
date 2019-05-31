'use strict';

const routesLights = require('./lightRoutes');

exports.setRouter = function(router, mqttClient) {
	var routes = new Array();

	//Import routes
	routes = routes.concat(routesLights(mqttClient));

	//Set listRoutes in express
	routes.forEach((element) => {
		console.log('routes [' + element.mode + '][' + element.path + ']');
		router[element.mode]('/' + element.path, element.funct);
	});

	return router;
};
