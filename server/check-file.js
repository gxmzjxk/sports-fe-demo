var fs = require('fs');
var path = require('path');

var logDir = path.resolve(__dirname, 'logs');

var accessLog = path.resolve(logDir, 'access.log');
var errorLog = path.resolve(logDir, 'error.log');

fs.readdir(logDir, function(err,data){
	if(err){
		if(err.code === 'ENOENT'){
			console.log('logs日志目录不存在，新建一个');
			fs.mkdirSync(logDir);
		}
	}
	fs.readFile(accessLog, function (err, data) {
		if (err) {
			if (err.code === 'ENOENT') {
				fs.writeFile(accessLog, '', () => {
					console.log('accessLog 不存在，新创建一个');
				});
			}
		}
	});
    
	fs.readFile(errorLog, function (err, data) {
		if (err) {
			if (err.code === 'ENOENT') {
				fs.writeFile(errorLog, '', () => {
					console.log('errorLog 不存在，新创建一个');
				});
			}
		}
	});
});