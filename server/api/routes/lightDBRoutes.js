'use strict';

var log = require('../utils/log').getLog('lightDBRoutes');

module.exports = function() {
	var routesList = new Array();
	var LightController = require('../controllers/LightController');

	var _funcGetListLight = function(req, res) {
		LightController.getListLight()
			.then((dataList) => {
				res.status(200).send(dataList);
			})
			.catch((err) => {
				log.error('get_list_light', err.message);
				res.status(500).send({ desc: err });
			});
	};
	routesList.push({
		path: 'get_list_light',
		funct: _funcGetListLight,
		mode: 'get'
	});

	var _funcGetLightId = function(req, res) {
		var id = req.params.id;
		log.info('id', id);
		LightController.getLightId(id)
			.then((data) => {
				log.info({ data: data });
				res.status(200).send(data);
			})
			.catch((err) => {
				log.error('get_light/[' + id + ']', err.message);
				res.status(500).send({ desc: err });
			});
	};
	routesList.push({
		path: 'get_light/:id',
		funct: _funcGetLightId,
		mode: 'get'
	});

	return routesList;
};
