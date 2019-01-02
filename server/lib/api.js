const Request = require('./request');
const URL = require('./url');
const FeedFormat = require('../format/feed');
const RankFormat = require('../format/rank');
const Moment = require('../utils/moment');
const NAME_ID_DIC = require('../../shared/name-id');
const reqAlmost = function (r) {
    return Promise.all(r.map(p => {
        if (p.catch) {
            return p.catch((err) => {
                err.failed = true;
                return err;
            });
        } else {
            return p;
        }
    }));
};
module.exports = {
    async getFeedList(opt = {}) {   //获取feed流
        let feedList = [];
        let streamId = opt.streamId || 15;
        let target = opt.target || '';
        let pagenum = opt.page || 1;
        const baseURL = URL.genRecommendUrl();
        const feedReq = new Request({
            baseURL
        });
        const feedData = await feedReq.fetch({
            url: `/mix/region/${streamId}`,
            params: {
                page: pagenum,
                size: 20,
                mpId: target,
                client: 1,
                requestId: '',
                pvId: '',
                sessionId: ''
            }
        });
        return FeedFormat.formatFeedList(feedData);
    },
    _getInitPaneFeed(opt = {}) {
        const baseURL = URL.genRecommendUrl();
        const feedReq = new Request({ baseURL });
        return feedReq.fetch({
            url: `/mix/region/${opt.streamId}`,
            params: {
                page: 1,
                size: 20,
                mpId: opt.target,
                client: 3,
                requestId: '',
                pvId: 'pc-test',
                sessionId: ''
            }
        });

    },
    async getHomeFeedsList(leagueInfo = {}) {
        let homeStreamId = leagueInfo.feed && leagueInfo.feed.home;
        let teamStreamId = leagueInfo.feed && leagueInfo.feed.team;
        let hotTeams = leagueInfo.hotTeams;
        let paneTeamNews;
        let topNews = this._getInitPaneFeed({
            streamId: homeStreamId
        });
        let requestArr = [topNews];
        if (Array.isArray(hotTeams) && hotTeams.length > 0) {
            hotTeams.forEach((team) => {
                paneTeamNews = this._getInitPaneFeed({
                    streamId: teamStreamId,
                    target: team
                });
                requestArr.push(paneTeamNews);
            });
        }
        let feeds = await reqAlmost(requestArr);
        return FeedFormat.formatGroupFeeds(hotTeams, feeds);

    },

    async getHomeMatchSchedule(opt = {}) {  //获取赛事列表
        let preList = [], nextList = [];
        if (opt && opt.api) {
            const baseURL = URL.genSportsDataUrl();
            const sReq = new Request({ baseURL });
            let nowDate = new Moment().formatTime('yyyyMMdd');
            const matchList = await reqAlmost([
                sReq.fetch({
                    url: opt.api,
                    params: {
                        date: nowDate,
                        days: -10
                    }
                }),
                sReq.fetch({
                    url: opt.api,
                    params: {
                        date: nowDate,
                        days: 10
                    }
                })
            ]);
            if (!matchList[0].failed) {
                preList = matchList[0];
            }
            if (!matchList[1].failed) {
                nextList = matchList[1];
            }
            return preList.concat(nextList);
        }
    },
    removeEmptyFeed(feedNav, homeNews, teamNews) {  //去除空的feed流
        const array = [];
        teamNews = teamNews.filter((item, index) => {
            if (item[1].length === 0) {
                array.push(index + 1);
                return false;
            }
            return true;
        });

        feedNav = feedNav.filter((item, index) => {
            if (array.indexOf(index) > -1) {
                return false;
            }
            return true;
        })

        return { feedNav, homeNews, teamNews }
    },

    async getRankList(leagueInfo = {}) {  //获取榜单列表，球队榜单未考虑分组情况，需要完善一下
        let leagueId = leagueInfo && leagueInfo.id;
        let response, output = {}, showType;
        const baseURL = URL.genSportsDataUrl();
        let prefix = '/football/' + leagueId;
        const rankReq = new Request({
            baseURL
        });
        if (leagueId === NAME_ID_DIC.nba) {
            showType = 'nba';
            prefix = '/nba';
        } else if (leagueId === '7' || leagueId === '679') {
            showType = 'group';
        } else {
            showType = 'normal';
        }
        if (showType === 'nba') {
            response = await rankReq.fetch({
                url: `${prefix}/standings/teams`
            });
        } else {
            response = await reqAlmost([
                rankReq.fetch({
                    url: `${prefix}/standings/teams`
                }),
                rankReq.fetch({
                    url: `${prefix}/standings/shooters`
                }),
                rankReq.fetch({
                    url: `${prefix}/standings/assists`
                })
            ]);
        }
        return RankFormat.formatRankList(response, showType);
    }
};