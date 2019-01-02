const LEAGUE_DIC = require('../../../shared/league-dic');
const TOP_NAV = require('../top-nav');
const MAIN_NAV = require('../main-nav');
const Util = require('../../utils/util');
//
const API = require('../../lib/api');

const NavFormat = require('../../format/nav');
const MatchFormat = require('../../format/match');
const genHome = async function (opt) {
    const leagueInfo = Util.clone(LEAGUE_DIC[opt.leagueId]);
    let topNav = NavFormat.formatTopNav(TOP_NAV);
    let mainNav = NavFormat.formatMainNav(MAIN_NAV, leagueInfo);
    let matchSchedule = await API.getHomeMatchSchedule({
        api: `/football/${opt.leagueId}/schedule`
    });
    let matchList = MatchFormat.buildList(matchSchedule, 'football', leagueInfo);
    let groupFeeds = await API.getHomeFeedsList(leagueInfo);
    let rankList = await API.getRankList(leagueInfo);
    return {
        topNav,
        mainNav,
        matchList,
        groupFeeds,
        rankList
    };
};

module.exports = {
    genHome,
};