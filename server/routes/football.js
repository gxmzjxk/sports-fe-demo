const express = require('express');
const genData = require('../pages_conf/football/genData');
const router = express.Router();
const pagesConfig = require('../pages_conf/football/');
const LEAGUE_DIC = require('../../shared/league-dic');
const Util = require('../utils/util');

// 首页
router.get('/:leagueId', function (req, res, next) {
    let pageConfig = Util.clone(pagesConfig.home), pageView;
    const leagueId = req.params['leagueId'];
    pageConfig.leagueId = leagueId;
    genData.genHome(pageConfig).then((pageData) => {
        res.render('football/home/index', pageData);
    }).catch((err) => {
        res.render('error', {
            error: '请求首页数据出错'
        });
    });
});

module.exports = router;