module.exports = {
    //推荐流
    genRecommendUrl() {
        let baseUrl = 'https://v2.sohu.com/integration-api';
        if (process.env.RUNNING_ENV === 'bx') {
            baseUrl = 'http://dmo-feed-server-bx.default.svc.sohupc.domeos.local:7777/integration-api';
        } else if (process.env.RUNNING_ENV === 'yz') {
            baseUrl = 'http://dmo-feed-server.default.svc.sohupc.domeos.local:7777/integration-api';
        }
        return baseUrl;
    },
    // 体育数据API
    genSportsDataUrl() {
        let baseUrl = 'http://10.16.58.120:8988';
		if (process.env.RUNNING_ENV === 'bx') {
			baseUrl = 'http://dmo-sports-query-prodbx.default.svc.sohupc.domeos.local:8777';
		} else if (process.env.RUNNING_ENV === 'yz') {
			baseUrl = 'http://dmo-sports-query-prodyz.default.svc.sohupc.domeos.local:8777';
		}
		return baseUrl;
    },
    // 运营管理 Node API
    genNodeApiUrl() {
        let baseUrl = 'http://10.11.174.20:8081';
        if (process.env.RUNNING_ENV === 'bx') {
            baseUrl = 'http://dmo-sports-node-prod-bx-external.sports-node-api.svc.sohupc.domeos.local:8081';
        } else if (process.env.RUNNING_ENV === 'yz') {
            baseUrl = 'http://dmo-sports-node-prod-yz-external.sports-node-api.svc.sohupc.domeos.local:8081';
        }
        return baseUrl;
    },

    //获取体育频道相关赛事列表信息 API
    genMatchListUrl(){
        let baseUrl = 'https://v2.sohu.com/sports-data/football';
        return baseUrl;
    },

    //获取赛事的详细信息列表 API
    genDetailListUrl(){
        let baseUrl = 'http://v2.sohu.com/sports-data/football';
        return baseUrl;
    },

    //获取积分、射手、助攻榜单 API
    genRankListUrl(){
        let baseUrl = 'https://v2.sohu.com/sports-data/football';
        return baseUrl;
    }
};