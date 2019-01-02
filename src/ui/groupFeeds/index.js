require('./index.less');
let cacheIndex = 0;
const GroupFeeds = Backbone.View.extend({
    events: {
        'click .titles .tab': 'changeTab',
    },
    curTab: 0,
    initialize(opt) {
        this.updateTabView();
    },
    updateTabView() {
        let tabs = this.$el.find('.titles .tab');
        let panes = this.$el.find('.feeds .pane');
        let curTab = tabs[this.curTab];
        let curPane = panes[this.curTab];
        $(tabs[cacheIndex]).removeClass('active');
        $(panes[cacheIndex]).removeClass('active');
        // add Class
        $(curTab).addClass('active');
        $(curPane).addClass('active');
        // 缓存下 activeTab
        cacheIndex = this.curTab;
    },
    changeTab(e) {
        let newIndex = $(e.target).data('index');
        this.curTab = newIndex;
        this.updateTabView();
    }
});

module.exports = GroupFeeds;