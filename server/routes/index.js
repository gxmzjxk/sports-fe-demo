var path = require('path');
var express = require('express');
var router = express.Router();
const pageService = require('../page_service');

/* 首页*/
router.get('/home', function (req, res) {
    pageService.home.genData().then((pageData) => {
        res.render('home/index', pageData);
    }).catch(err => {
        res.render('404/index', err);
    });
});

// 频道页
router.get('/ch/:channel_id', function (req, res) {
    pageService.channel.genData(req.params.channel_id).then((pageData) => {
        res.render('channel/index', pageData);
    }).catch(err => {
        console.log(err);
    });
});

// 频道页请求feed流
router.get('/getmore', function(req,res){
    pageService.channel.getMorefeed(req.query).then( moreNews => {
        res.json(moreNews);
    }).catch(err => {
        console.log(err);
    });
});

router.get('*', function (req, res, next) {
    var reg = /^\/(css|js|views)/i;
    if (reg.test(req.path)) {
        next();
    } else {
        res.render('404/index', null);
    }
})
module.exports = router;