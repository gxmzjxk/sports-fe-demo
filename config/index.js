
'use strict';
const path = require('path');

module.exports = {
	build: {
		env: require('./prod.env'),
		port: 9091,
		viewsDirectory: path.resolve(__dirname, '../dist/templates'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: process.env.NODE_ENV === 'testing' ? '/' : '//statics.itc.cn/wcup/',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 9090,
		viewsDirectory: path.resolve(__dirname, '../templates'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {},
		cssSourceMap: false
	}
};