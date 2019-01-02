const feed = require('./model');

const feeds = Backbone.Collection.extend({
  model: feed
});

module.exports = feeds;

