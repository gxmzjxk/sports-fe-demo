const MainNav = require('../ui/mainNav');
const MatchSchedule = require('../ui/matchSchedule');
const GroupFeeds = require('../ui/groupFeeds');
const FixedMenu = require('../ui/fixedMenu');
const RankData = require('../ui/rankData');

module.exports = function (opt = {}) {
    new MainNav({
        el: '.main-nav'
    });

    new MatchSchedule({
        el: '.home-match-schedule'
    });

    new GroupFeeds({
        el: '.left-content'
    });
    new RankData({
        el: '.right-content'
    });
    //
    new FixedMenu({
        el: '.fixed-menu-wrap'
    });
};