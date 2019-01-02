require('./index.less');

const navBar = Backbone.View.extend({
  template: _.template(require('./template.html')),

  initialize: function(opt){
    this.data = opt.navdata;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({navdata:this.data}));
  }
});

module.exports = navBar;