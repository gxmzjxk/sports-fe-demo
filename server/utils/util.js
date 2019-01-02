const clone = (obj) => {
    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== 'object') return obj;

    // Handle Date
    if (obj instanceof Date) {
        const copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        const copy = [];
        const len = obj.length;
        for (let i = 0; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Moment
    if (obj._isAMomentObject) {
        return obj.clone();
    }

    // Handle Object
    const copy = {};
    for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
};
const formatFeedList = function (list) {

};
module.exports = {
    clone,
    formatFeedList,
    /**
     * [addQueryArgs 给url添加参数]
     * @param {[string]} url      [需添加参数的url]
     * @param {[object]} paramObj [需添加的参数,hash键值对形式]
     */
    addQueryArgs: function (url, paramObj) {
        var result;
        var key, value;
        if (!url) {//url 为空不做处理。

            return '';
        }
        for (key in paramObj) {
            value = paramObj[key];
            result = new RegExp('(' + key + '=)[^&]+', 'i');
            if (url.match(result)) {
                url = url.replace(result, '$1' + value);
            } else {
                url += (url.indexOf('?') === -1) ?
                    ('?' + key + '=' + value) : ('&' + key + '=' + value);
            }
        }

        return url;
    },
};