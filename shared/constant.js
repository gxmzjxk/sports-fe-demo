const STORE_KEY = {
    USER_FOLLOW: 'user_follow_teams',
    SESSION_PV_IDS: 'session_pv_ids',
    CLOSE_APP_FLAG: 'close_app_flag',
    PAGE_VIEW_FLAG: 'page_view_flag',
    DAILY_VIEWED_LIST: 'daily_viewed_list',
    FEEDBACK_VISITED_FLAG: 'feed_back_visted',
    BECOME_VIP_TIME: 'become_vip_time',
};
const GAME_TYPE = {
    '-1': '季前赛',
    1: '小组赛',
    2: '1/8决赛',
    3: '1/4决赛',
    4: '半决赛',
    5: '第三名决赛',
    6: '决赛',
    15: '常规赛',
    16: '全明星赛',
    17: '季前赛',
    18: '季后赛'
};
const POSITION = {
    1: '门将',
    2: '前锋',
    3: '中场',
    4: '后卫'
};
const GAME_STATUS = {
    '-2': '中止',
    '-1': '延期',
    0: '取消',
    1: '未开赛',
    2: '进行中',
    3: '已结束',
    4: '已结束'
};
const GAME_STATUS_CLASS = {
    '-2': '',
    '-1': '',
    0: '',
    1: 'pre',
    2: 'ing',
    3: 'end',
    4: 'end'
}
const GAME_STATUS_TYPE = {
    '-2': 'end',
    '-1': 'pre',
    0: 'end',
    1: 'pre',
    2: 'ing',
    3: 'end',
    4: 'end'
};
const TAGS = {
    base: '2018世界杯'
};
const TEAM_ID = {
    俄罗斯: 33,
    乌拉圭: 34,
    埃及: 35,
    沙特阿拉伯: 36,
    葡萄牙: 37,
    西班牙: 38,
    摩洛哥: 39,
    伊朗: 40,
    丹麦: 41,
    秘鲁: 42,
    澳大利亚: 43,
    法国: 44,
    冰岛: 45,
    阿根廷: 46,
    克罗地亚: 47,
    尼日利亚: 48,
    瑞士: 49,
    塞尔维亚: 50,
    巴西: 51,
    哥斯达黎加: 52,
    德国: 53,
    瑞典: 54,
    墨西哥: 55,
    韩国: 56,
    英格兰: 57,
    比利时: 58,
    突尼斯: 59,
    巴拿马: 60,
    波兰: 61,
    哥伦比亚: 62,
    日本: 63,
    塞内加尔: 64
};
const GAME_TAGS = {
    49: '1/8决赛第1场',
    50: '1/8决赛第2场',
    51: '1/8决赛第3场',
    52: '1/8决赛第4场',
    53: '1/8决赛第5场',
    54: '1/8决赛第6场',
    55: '1/8决赛第7场',
    56: '1/8决赛第8场',
    57: '1/4决赛第1场',
    58: '1/4决赛第2场',
    59: '1/4决赛第3场',
    60: '1/4决赛第4场',
    61: '半决赛第1场',
    62: '半决赛第2场',
    63: '三四名决赛',
    64: '决赛',

};
const DEFAULT_AVATAR = '//statics.itc.cn/wcup2018/images/headphoto.png';
const PRELOAD_PIC = '//statics.itc.cn/web/static/images/pic/preload.png';

module.exports = {
    STORE_KEY,
    GAME_TYPE,
    POSITION,
    GAME_STATUS,
    GAME_STATUS_CLASS,
    TAGS,
    GAME_TAGS,
    DEFAULT_AVATAR,
    PRELOAD_PIC
}