const APIUtil = require("./api_util");

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.fetchMoreTweets()
  }

  fetchTweets() {
    const resp = APIUtil.feedReq();
    resp.then(tweets => this.insertTweets(tweets));
  }

  fetchMoreTweets() {
    const $button = $(this.$el.find("button.fetch-more"));
    $button.on("click", event => {
      event.preventDefault();
      this.fetchTweets();
    });
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