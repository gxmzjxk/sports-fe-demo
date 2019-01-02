const hotTeamsDic = require('./hot-teams');
const subChannelDic = require('./sub-channel');
const LEAGUE_DIC = {
	7: {
		id: 7,
		name: '欧冠',
		mini: 'og',
		icon: '//statics.itc.cn/sports/icon/12.png',
		ext: '',
		feed: { home: 83, team: 108, match: 107 },
		hotTeams: hotTeamsDic[7],
		subChannel: subChannelDic[7],
		keywords: ''
	},
	8: {
		id: 8,
		name: '西甲',
		mini: 'xj',
		icon: '//statics.itc.cn/sports/icon/8.png',
		ext: '',
		feed: { home: 76, team: 77, match: 78 },
		hotTeams: hotTeamsDic[8],
		subChannel: subChannelDic[8],
		keywords: '西甲,皇马,皇家马德里,巴萨罗那,巴萨,马竞,马德里竞技'
	},
	17: {
		id: 17,
		name: '英超',
		mini: 'yc',
		icon: '//statics.itc.cn/sports/icon/7.png',
		feed: {
			home: 15,
			match: 52,
			team: 53,
		},
		ext: '',
		hotTeams: hotTeamsDic[17],
		subChannel: subChannelDic[17],
		keywords: '英超,曼联,曼城,利物浦,阿森纳,切尔西,热刺'
	},
	23: {
		id: 23,
		name: '意甲',
		mini: 'yj',
		icon: '//statics.itc.cn/sports/icon/9.png',
		ext: '',
		feed: { home: 71, team: 70, match: 72 },
		hotTeams: hotTeamsDic[23],
		subChannel: subChannelDic[23],
		keywords: '意甲,尤文,国米,米兰,尤文图斯,国际米兰,AC米兰'
	},
	34: {
		id: 34,
		name: '法甲',
		mini: 'fj',
		icon: '//statics.itc.cn/sports/icon/11.png',
		ext: '',
		feed: {
			home: 67,
			match: 68,
			team: 69,
		},
		hotTeams: hotTeamsDic[34],
		subChannel: subChannelDic[34],
		keywords: '法甲,巴黎,巴黎圣日耳曼'
	},
	35: {
		id: 35,
		name: '德甲',
		mini: 'dj',
		icon: '//statics.itc.cn/sports/icon/10.png',
		ext: '',
		feed: { home: 73, team: 74, match: 75 },
		hotTeams: hotTeamsDic[35],
		subChannel: subChannelDic[35],
		keywords: '德甲,拜仁慕尼黑,拜仁'
	},
	679: {
		id: 679,
		name: '欧联',
		mini: 'ol',
		icon: '//statics.itc.cn/sports/icon/13.png',
		ext: '',
		feed: { home: 84, team: 110, match: 109},
		hotTeams: hotTeamsDic[679],
		subChannel: subChannelDic[679],
		keywords: ''
	},
	1: {
		id: 1,
		name: '欧美男足',
		mini: 'wzzq',
		icon: '//statics.itc.cn/sports/icon/14.png',
		ext: '',
		feed: { home: 85 },
		hotTeams: [],
		subChannel: subChannelDic[1],
		keywords: ''
	}
};
module.exports = LEAGUE_DIC;