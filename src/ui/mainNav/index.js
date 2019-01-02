require('./index.less');
const MainNav = Backbone.View.extend({
    events: {
        "mouseover .title": "showSubChannel",
    },
    showSubChannel(e) {
        var contentList = $(this.$el).find('div.content');
        contentList.each(function(index, item) {
            if ($(item).hasClass('active')) {
                $(item).removeClass('active');
            }
        });
        $(e.currentTarget).next().addClass('active');
    }
});

module.exports = MainNav;