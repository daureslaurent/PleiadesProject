'use strict';

const MapLight = require('../mapping/LightReduced');
const MapLightList = require('../mapping/LightList');
var log = require('../utils/log').getLog('lightDBRoutes');

module.exports = function() {
	var routesList = new Array();
	var LightController = require('../controllers/LightController');

	var _funcGetListLight = (req, res) => {
		LightController.getListLight()
			.then((dataList) => {
				res.status(200).send(MapLightList(dataList));
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
		LightController.getLightId(id)
			.then((data) => {
				res.status(200).send(MapLight(data));
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
