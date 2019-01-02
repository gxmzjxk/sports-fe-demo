const Util = require('../utils/util');
const LINK_KEY_DIC = {
    match: {
        title: '赛程',
        key: 'match',
        url: 'http://match.sports.sohu.com/SohuSoccer/soccer/match/league'
    },
    standing: {
        title: '积分',
        key: 'standing',
        url: 'http://match.sports.sohu.com/SohuSoccer/soccer/standing/table'
    },
    shootlist: {
        title: '射手',
        key: 'shootlist',
        url: 'http://match.sports.sohu.com/SohuSoccer/soccer/player/shootlist'
    }
};
module.exports = {
    formatTopNav(navList) {
        return navList;
    },
    formatMainNav(mainNav = {}, leagueInfo = {}) {
        let navList = mainNav.navList;
        let subItem;
        if (Array.isArray(navList) && navList.length > 0) {
            mainNav.navList = navList.map((nav) => {
                nav.subChannel = nav.subChannel.map((sub) => {
                    if (typeof sub === 'string') {
                        subItem = LINK_KEY_DIC[sub];
                        subItem.link = Util.addQueryArgs(subItem.link, {
                            tournamentid: leagueInfo.id
                        });
                    } else if (typeof sub === 'object') {
                        subItem = sub;
                    }
                    return subItem;
                });
                return nav;
            });
        }
        return mainNav;
    }
}