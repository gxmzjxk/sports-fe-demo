const formatRankList = function (response, showType) {
    let output = {};
    let tmp;
    if (showType === 'nba') {
        output.teams = response;
    } else {
        if (response[0].failed) {
            output.teams = {
                default: []
            };
        } else {
            output.teams = miniData(response[0], showType);
        }
        if (response[1].failed) {
            output.shooters = [];
        } else {
            tmp = miniData(response[1]);
            output.shooters = formatPlayer(tmp);
        }
        if (response[2].failed) {
            output.assists = [];
        } else {
            tmp = miniData(response[2]);
            output.assists = formatPlayer(tmp);
        }
    }
    output.type = showType;
    return output;
};

const formatPlayer = function (list) {
    let playerList = [];
    let trueRank = 1;
    let currentNum = 0;
    if (Array.isArray(list) && list.length > 0) {
        playerList = list.map((item, index) => {
            if (!currentNum) currentNum = item.stats.assists;
            if (item.stats.assists < currentNum) {
                currentNum = item.stats.assists;
                trueRank = index + 1;
            }
            item.rank = trueRank;
            //
            item.playerName = item.playerInfo.playerName || item.playerInfo.otherName;
            // polyfill
            item.playerInfo = item.playerInfo || {};
            return item;
        });
    }
    return playerList;
};

const miniData = function (model, type = 'normal') {
    const NBA_NUM = 6;
    const GROUP_NUM = 4;
    const NORMAL_NUM = 5;
    let _miniData = [];
    if (Array.isArray(model)) {
        _miniData = model.slice(0, NORMAL_NUM);
    } else if (model && Array.isArray(model.default)) {
        _miniData = model.default.slice(0, NORMAL_NUM);
    } else if (type === 'nba' && model.Eastern && model.Western) {
        _miniData.Eastern = model.Eastern.slice(0, NBA_NUM);
        _miniData.Western = model.Western.slice(0, NBA_NUM);
    }
    return _miniData;
};

module.exports = {
    formatRankList
};