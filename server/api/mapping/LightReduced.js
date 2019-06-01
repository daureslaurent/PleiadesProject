'use strict';

module.exports = function(rawData) {
	//final obj

	/*
    "__v": 0,
    "_id": "5cf1efe21b7cff4eece1992f",
    "brightness": 15,
    "connected": true,
    "deviceId": "PR0",
    "lastUpTime": 1559407345067,
    "name": "PLEIADES-PR01",
    "color": {
        "b": 255,
        "g": 255,
        "r": 0
    }
    */
	var final = {
		id: rawData._id,
		name: rawData.name,
		brightness: rawData.brightness,
		connected: rawData.connected,
		deviceId: rawData.deviceId,
		color: rawData.color
	};

	return final;
};
