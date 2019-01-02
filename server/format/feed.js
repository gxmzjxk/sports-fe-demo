const Moment = require('../utils/moment');
const Util = require('../utils/util');
const formatFeedList = function (_list) {
    let nowTime, showTime, list = [];
    if (Array.isArray(_list) && _list.length > 0) {
        nowTime = Date.now();
        list = _list.map((o) => {
            showTime = Number(o.publishTime) || Number(o.publicTime) || nowTime;
            o.showTime = new Moment(showTime).fixTime({
                wcup: true
            });
            o.link = Util.addQueryArgs(o.url, {
                scm: o.scm
            });
            o.picUrl = o.picUrl || o.cover;
            const _title = o.title.replace(/【.*】/, '');
            if (_title) {
                o.title = _title;
            }
            //
            return o;
        });
    }
    return list;
};

const formatGroupFeeds = function(keyList = [], response = []) {
    const TOP_TAB = '要闻';
    let formatList = [];
    keyList.unshift(TOP_TAB);
    keyList.forEach((key, index) => {
        let paneFeeds = [];
        if (response[index].status === 0) {
            paneFeeds = response[index].data;
        }
        formatList.push({
            title: key,
            news: formatFeedList(paneFeeds)
        });
    });
    return formatList;
};

module.exports = {
    formatGroupFeeds,
    formatFeedList
};