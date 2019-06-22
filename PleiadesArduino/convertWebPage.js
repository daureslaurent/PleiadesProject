var fs = require('fs');
var path = require('path');

var sourcePath = 'wifiConfig.html';
var dstPath = 'pleiades_setup_web.ino';

var srcPath = path.join(__dirname, sourcePath);
var dstPath = path.join(__dirname, dstPath);

var nameVarPage = 'dataPage';

fs.readFile(srcPath, { encoding: 'utf-8' }, function(err, data) {
	if (!err) {
		var dataC = cstr_encode(data /*.replace(/ /g, '')*/);

		//format for inject
		dataC = '    ' + nameVarPage + ' += ' + dataC + ';';
		//dataC = dataC.replace(/(?:\r\n|\r|\n)/g, ';' + nameVarPage + '+=') + ';';

		//console.log(dataC);

		fs.readFile(dstPath, { encoding: 'utf-8' }, function(err, dataDst) {
			if (!err) {
				var indexInject = dataDst.indexOf('//<autoStart>') + '//<autoStart>'.length;
				var startStr = dataDst.substring(0, indexInject) + '\n';

				var indexEnd = dataDst.indexOf('//<autoEnd>');
				var endStr = '\n' + dataDst.substring(indexEnd, dataDst.length);

				var finalStr = startStr + dataC + endStr;

				console.log(startStr);
				console.log(endStr);

				fs.writeFile(dstPath, finalStr, 'utf8', function(err) {
					if (err) return console.log(err);
				});
			} else {
				console.log(err);
			}
		});
	} else {
		console.log(err);
	}
});

function cstr_encode(input) {
	var output = '"';
	var splitLines = false;
	for (i = 0; i < input.length; i++) {
		switch (input[i]) {
			case '\f':
				output += '\\f';
				break;
			case '\n':
				if (splitLines) {
					output += '\\n"\n"';
				} else {
					output += '\\n';
				}
				break;
			case '\r':
				output += '\\r';
				break;
			case '\t':
				output += '\\t';
				break;
			case '"':
				output += '\\"';
				break;
			case '\\':
				output += '\\\\';
				break;
			default:
				output += input[i];
				break;
		}
	}
	output += '"';
	return output;
}
