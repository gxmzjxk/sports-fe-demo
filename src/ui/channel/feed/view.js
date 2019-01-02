const feedCollection = require('./collection');
require('./index.less');

const feedView = Backbone.View.extend({

  loading: false,

  curFeed: 0,

  template: _.template(require('./template.html')),

  initialize: function(opt){
    const data = [];
    opt.feedNav.unshift("要闻");
    _.each(opt.feedNav,function(item){   //设置各球队请求url
      const feed = new feedCollection([]);
      feed.url = '/getmore/?team=' + window.encodeURIComponent(item)+ '&pageid='+ opt.pageId;
      feed.getTimes = 1;
      data.push(feed);
    });
    this.feeds = data;
  },

  events:{
    'click .feedheader .text' : 'toggle',
    'click .btn' : 'getMore'
  },

  toggle: function(e){   //点击导航切换样式
    $('.feedheader .active_text').removeClass('active_text');
    $('.feedheader .select_border').removeClass('select_border');
    $('.feedcontent .active_feed').removeClass('active_feed');
    this.curFeed = Number($(e.target).attr('data-target'));
    $('.feedcontent [data-target="' + this.curFeed +'"]').addClass('active_feed');
    $(e.target).addClass('active_text'); 
    $(e.target.nextSibling).addClass('select_border');
  },

  getMore: function(e){  //刷新
    if (!this.loading){
      const btn = $(e.target)
      btn.text("加载中...");
      this.loading = true;
      const that = this;
      const feedCollection = this.feeds[this.curFeed];
      feedCollection.fetch({
        url: feedCollection.url + '&pagenum=' + (++feedCollection.getTimes),
        success: function(collection, response, options){
          that.insertFeed(response);
          that.loading = false;
          if (response.length === 0 || response[1].length === 0){
            btn.text("没有内容了");
            btn.removeClass('btn');
          }else{
            btn.text("查看更多");
          }
        },
        error: function(collection, response, options){
          btn.text("加载失败,请重试");
        }
      });
    }
  },

  insertFeed: function(response){  //将返回的数据插入
    let that = this;
    let data = null;
    if (response[0] instanceof Object){
      data = response;
    }else{
      data = response[1];
    }
    const targetList = $('.active_feed ul');
    _.each(data, function(item){
      targetList.append($("<li></li>").html(that.template({feed:item})));
    });
  }
});

module.exports = feedView;