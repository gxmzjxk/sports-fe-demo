'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV === 'testing'
	? require('../config/test.env')
	: config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].js'),
		chunkFilename: utils.assetsPath('js/[id].js')
	},
	plugins: [
		new ExtractTextPlugin({
			filename: utils.assetsPath('css/[name].css')
		}),
	]
});

module.exports = webpackConfig;
