const defaultChannel = [
    {
        title: '赛程',
        key: '',
        link: ''
    },
    {
        title: '积分',
        key: '',
        link: ''
    },
    {
        title: '射手',
        key: '',
        link: ''
    }
];

const navList = [
    {
        title: 'NBA',
        link: 'http://sports.sohu.com/nba.shtml',
        subChannel: defaultChannel
    },
    {
        title: 'CBA',
        link: 'http://cbachina.sports.sohu.com/',
        subChannel: defaultChannel
    },
    {
        title: '中超',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
    //
    {
        title: '国足',
        link: 'http://sports.sohu.com/1/1203/47/subject217104782.shtml',
        subChannel: defaultChannel
    },
    {
        title: '中甲',
        link: 'http://sports.sohu.com/s2004/zhongjia.shtml',
        subChannel: defaultChannel
    },
    {
        title: '英超',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: [
            'match', 'standing', 'shootlist'
        ]
    },
    {
        title: '西甲',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: [
            'match', 'standing', 'shootlist'
        ]
    },
    {
        title: '意甲',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: [
            'match', 'standing', 'shootlist'
        ]
    },
    {
        title: '德甲',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
    {
        title: '欧冠',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
    {
        title: '亚冠',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
    {
        title: '电竞',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
    {
        title: '法甲',
        link: 'http://sports.sohu.com/zhongchao.shtml',
        subChannel: defaultChannel
    },
];
const plugin = [
    {
        title: '亚运会',
        link: ''
    }
];
module.exports = {
    navList,
    plugin
}