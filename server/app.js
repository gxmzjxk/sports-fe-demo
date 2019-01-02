require('./check-file');// 坑：可能服务启动的时候日志文件没有创建完成
const config = require('../config');

const footballRoute = require('./routes/football');
const nbaRoute = require('./routes/nba');
const cbaRoute = require('./routes/cba');

var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'favicon.ico')));

function haltOnTimedout(req, res, next) {
	if (!req.timedout) next();
}

if (process.env.NODE_ENV !== 'production') {
	app.set('views', config.dev.viewsDirectory);
	app.use(express.static(config.dev.assetsRoot));
	// 热更新相关 start
	var webpack = require('webpack');
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var webpackConfig = require('../build/webpack.dev.conf');
	var compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: { colors: true }
	}));
	app.use(webpackHotMiddleware(compiler));
	// 热更新相关 end

	// 代理 request start
	var proxyMiddleware = require('http-proxy-middleware');
	var proxyTable = require('./proxy');
	Object.keys(proxyTable).forEach(function (context) {
		let options = proxyTable[context]
		if (typeof options === 'string') {
			options = { target: options }
		}
		app.use(proxyMiddleware(options.filter || context, options));
	});
	// 代理 request end
	app.use('/football', footballRoute);
	app.use('/nba', nbaRoute);
	app.use('/cba', cbaRoute);

	var server = http.createServer(app);
	server.listen(config.dev.port, function () {
		console.log('App (dev) is now running on port ' + config.dev.port);
	});
} else {
	app.set('views', config.build.viewsDirectory);
	app.use(express.static(config.build.assetsRoot));
	var timeout = require('connect-timeout'); //express v4
	app.use(timeout(2000));
	app.use(haltOnTimedout);

	app.use('/football', footballRoute);
	app.use('/nba', nbaRoute);
	app.use('/cba', cbaRoute);

	app.listen(config.build.port, function () {
		console.log('App (production) is now running on port ' + config.build.port);
	});
}