require('./index.less');

const navChild = Backbone.View.extend({
  template: _.template(require('./template.html')),

  initialize: function(options){
    this.data = options.curPage.childnav;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({data:this.data}));
  }
});

module.exports = navChild;