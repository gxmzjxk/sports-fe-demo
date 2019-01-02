const express = require('express');
const router = express.Router();
const genData = require('../pages_conf/nba/genData');

// 首页
router.get('/home', function (req, res, next) {
    const leagueId = req.params.leagueId;
    genData.genData(leagueId).then((pageData) => {
        res.render('cba/index', pageData);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;