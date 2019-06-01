'use strict';

const routesCtrlLights = require('./lightCtrlRoutes');
const routesDBLights = require('./lightDBRoutes');

exports.setRouter = function(router, mqttClient) {
	var routes = new Array();

	//Import routes
	routes = routes.concat(routesCtrlLights(mqttClient));
	routes = routes.concat(routesDBLights());

	//Set listRoutes in express
	routes.forEach((element) => {
		console.log('routes [' + element.mode + '][' + element.path + ']');
		router[element.mode]('/' + element.path, element.funct);
	});

	return router;
};
