require('./index.less');

const header = Backbone.View.extend({
  template: _.template(require('./template.html')),

  initialize: function(options){
    this.data = options.curPage.id || 17;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({pageId:this.data}));
  }
});

module.exports = header;