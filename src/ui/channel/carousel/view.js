require('./index.less');

const carousel = Backbone.View.extend({
  template: _.template(require('./template.html')),

  initialize: function (options) {
    const curIndex = this.handleData(options.match);
    this.name = options.curPage.name || "英超";
    this.render();
    this.computeListWidth(curIndex);
  },

  handleData: function (match) {  //将数据排序，计算展示的位置
    let array = [];
    let beforeLength = 0;
    let afterLength = 0;
    //扁平化数据
    match[0].forEach(function (item) {
      array = array.concat(item.games);
    });

    beforeLength = array.length;

    match[1].forEach(function (item) {
      array = array.concat(item.games);
    });
    afterLength = array.length - beforeLength;
    //按时间排序赛事
    array.sort(function (prev, next) {
      return prev.gameDateTime - next.gameDateTime;
    });

    //计算展示位置
    const now = new Date();
    let curIndex = 0;
    let len = array.length;
    if (array[len - 1].status >= 3) {  //全部比赛已结束
      curIndex = len - 6;
    } else if (beforeLength === 0) {  //今天之前无比赛记录
    } else if (array[beforeLength - 1].gameOrder !== array[beforeLength].gameOrder) {  //不同赛季
      if (array[beforeLength].gameDateTime - array[beforeLength - 1].gameDateTime > 14 * 24 * 60 * 60 * 1000) {
        curIndex = beforeLength;
      } else {
        curIndex = beforeLength - 2;
      }
    } else {  //同一个赛季
      if (new Date(array[beforeLength].gameDateTime).getDate() === now.getDate() && (now.getTime() - array[beforeLength].gameDateTime) <= Math.abs(24 * 60 * 60 * 1000)) {
        curIndex = beforeLength;
      } else {  //今天没有比赛
        if (afterLength >= 4) {
          curIndex = beforeLength - 2;
        } else {
          curIndex = beforeLength - (6 - afterLength);
        }
      }
    }

    this.data = array;
    return curIndex;
  },

  computeListWidth: function (curIndex) {  //计算列表长度，并展示到合理位置
    const item_width = $('#carousel .box').width();
    const list = $('#carousel>.wrapper>ul');
    list.width(this.data.length * item_width);
    list.css('left', -curIndex * item_width);
  },

  animate: function (direction, step, time) {  //列表动画
    if (!window.animateId) {
      const offset = direction > 0 ? step : (-step);
      const list = $('#carousel>.wrapper>ul');
      let distance = 0;
      const items_width = 6 * $('#carousel .box').width();
      const list_width = list.width();
      const btns = $('#carousel>.btns');
      const btn_left = $('#carousel>.left');
      const btn_right = $('#carousel>.right');
      window.animateId = setInterval(function () {
        const left = parseInt(list.css('left'));
        if (distance >= items_width || (left >= 0 && offset > 0) || (left <= (items_width - list_width) && offset < 0)) {
          clearInterval(window.animateId);
          window.animateId = null;
          if (left >= 0 && offset > 0) {
            btn_right.removeClass("forbidden");
            btn_right.addClass("poniter");
          } else if (left <= (items_width - list_width) && offset < 0) {
            btn_left.removeClass("forbidden");
            btn_left.addClass("poniter");
          } else {
            btns.removeClass("forbidden");
            btns.addClass("poniter");
          }
          return;
        }
        list.css('left', `${left + offset}px`);
        distance += step;
      }, time);
      btns.removeClass("poniter");
      btns.addClass("forbidden");
    }
  },

  moveToLeft: function () {
    this.animate(-1, 10, 10);
  },

  moveToRight: function () {
    this.animate(1, 10, 10);
  },

  events: {
    "click .left": "moveToRight",
    "click .right": "moveToLeft"
  },

  render: function () {
    this.$el.html(this.template({ match: this.data, name: this.name }));
  }
});

module.exports = carousel;