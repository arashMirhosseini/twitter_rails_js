const APIUtil = require("./api_util");

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;
    this.fetchTweets();
  }

  fetchTweets() {
    const resp = APIUtil.feedReq();
    resp.then(tweets => this.insertTweets(tweets));
  }

  insertTweets(data) {
    const $tweetsUl = $(this.$el.find('ul.tweets'));
    data.forEach(tweet => {
      const $li = $("<li></li>");
      APIUtil.addTweet($li, tweet);
      $tweetsUl.append($li);
    });

  }

}

module.exports = InfiniteTweets;