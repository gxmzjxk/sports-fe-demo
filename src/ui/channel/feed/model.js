const feed = Backbone.Model.extend({
  initialize: function(opt){
    this.pics = opt.images;
    this.title = opt.title;
    this.author = opt.authorName;
    this.type = opt.type;
    this.time = opt.publicTime;
    this.url = opt.url;
    this.commentsNum = 0;
  }
});

module.exports = feed;