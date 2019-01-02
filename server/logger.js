const path = require('path');
const winston = require('winston');
const moment = require('moment');
const isProdEnv = process.env.NODE_ENV === 'production';

const logDir = path.resolve(__dirname, 'logs');
const dateFormat = function () {
	return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};
let logger;
if(isProdEnv){
	logger = new winston.Logger({
		transports: [
			new winston.transports.File({
				name: 'access-log',
				timestamp: dateFormat,
				filename: path.resolve(logDir, 'access.log'),
				level: 'info'
			}),
			new winston.transports.File({
				name: 'error-log',
				timestamp: dateFormat,
				filename: path.resolve(logDir, 'error.log'),
				level: 'error'
			})
		]
	});
}else{
	logger = new winston.Logger({
		transports: [
			new winston.transports.Console({
				timestamp: dateFormat,
				colorize: true
			})
		]
	});
}

module.exports = logger;