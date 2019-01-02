require('./assets/style/main.less');

const football = require('./football/index');

console.log(football);


(function (root) {
    try {
        root.sohu_mp = {
            football
        }
    } catch (e) {
        console.log("初始化代码错误");
        throw e;
    }
})(window);