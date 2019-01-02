const Moment = require('../utils/moment');
const { GAME_TYPE, GAME_STATUS, GAME_STATUS_CLASS } = require('../../shared/constant');

const formatMatchList = function (list, type = 'normal') {
    let moment;
    if (Array.isArray(list) && list.length > 0) {
        return list.map(item => {
            moment = new Moment(item.dateTime);
            item.week = moment.getWeek();
            item.date = moment.formatTime('MM-dd');
            item.games = formatGameList(item.games, false, type);
            return item;
        });
    } else {
        return [];
    }
};

const formatGameItem = function (game = {}, type = 'normal', league = {}) {
    const MATCH_BASE = 'http://match.sports.sohu.com/SohuSoccer/soccer/live';
    const TEAM_BASE = 'http://match.sports.sohu.com/SohuSoccer/soccer/team?teamid=33';
    let moment;
    if (type === 'nba' || type === 'cba') {
        game.link = '';
    } else {
        game.link = `${MATCH_BASE}?matchid=${game.gameCode}&tournamentid=${game.tournamentId}`;
    }
    game.hname = game.hTeamData ? game.hTeamData.teamName : '';
    game.hflag = game.hTeamData ? game.hTeamData.flag : '';
    game.vname = game.vTeamData ? game.vTeamData.teamName : '';
    game.vflag = game.vTeamData ? game.vTeamData.flag : '';
    if (game.group) {
        game.title = `${league.name}${GAME_TYPE[game.gameType]}${game.group}组`;
    } else if (game.gameOrder) {
        game.title = `${league.name}第${game.gameOrder}轮`;
    } else {
        game.title = `${league.name}${GAME_TYPE[game.gameType]}`;
    }
    game.statusShow = GAME_STATUS[game.status];
    game.statusClass = GAME_STATUS_CLASS[game.status];
    //
    moment = new Moment(game.gameDateTime);
    game.date = moment.formatTime('MM月dd日');
    game.time = moment.formatTime('hh:mm');
    return game;
}

const formatGameList = function (list, type = 'normal', league = {}) {
    let games = [];
    if (Array.isArray(list) && list.length > 0) {
        games = list.map((game) => {
            return formatGameItem(game, type, league);
        });
        //
        if (type === 'nba' || type === 'cba') {
            games = games.filter((item) => {
                return Number(item.hTeamId) && Number(item.vTeamId);
            });
        }
    }
    return games;
};

const buildList = function (preList = [], type, league = {}) {
    let matchList = [];
    let games;
    preList.forEach((item) => {
        games = formatGameList(item.games, type, league);
        matchList = matchList.concat(games);
    });
    return matchList;
};

module.exports = {
    formatMatchList,
    formatGameList,
    buildList
};