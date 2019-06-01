'use strict';

const routesCtrlLights = require('./lightCtrlRoutes');
const routesDBLights = require('./lightDBRoutes');
var log = require('../utils/log').getLog('RoutesManager');

exports.setRouter = function(router, mqttClient) {
	var routes = new Array();

	//Import routes
	routes = routes.concat(routesCtrlLights(mqttClient));
	routes = routes.concat(routesDBLights());

	//Set listRoutes in express
	routes.forEach((element) => {
		log.info('routes [' + element.mode + '][api/' + element.path + ']');
		router[element.mode]('/' + element.path, element.funct);
	});

	return router;
};
