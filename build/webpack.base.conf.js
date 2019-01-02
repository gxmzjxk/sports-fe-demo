'use strict';
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const files = require('./base/files');

function resolve(dir) {
	return path.join(__dirname, '..', dir);
}

module.exports = {
	entry: {
		main: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: 'static/js/[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'@': resolve('src'),
			'Vue': 'window.Vue'
		}
	},
	module: {
		rules: [
			{
				test: /siconfont.js/,
				use: utils.fontsLoader(),
			},
			{
				test: /\.jsx$|\.js$/,
				enforce: "pre",
				exclude: [],
				include: [],
				use: ['happypack/loader?id=ES3']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: [],
				include: [],
				use: 'babel-loader'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: [],
				include: [files.appPath],
				use: ['happypack/loader?id=JSX']
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
			{ test: /\.html$/, loader: "html-loader?attrs=false" }
		]
	},
	plugins: require('./modules/plugins')
};
