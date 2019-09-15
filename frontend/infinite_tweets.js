const APIUtil = require("./api_util");

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.fetchMoreTweets()
  }

  fetchTweets() {
    
    if (this.maxCreatedAt !== null) {
      const resp = APIUtil.feedReq({max_created_at: this.maxCreatedAt});      
      resp.then(tweets => this.insertTweets(tweets));
    } else {
      const resp = APIUtil.feedReq();
      resp.then(tweets => this.insertTweets(tweets));
    }
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
    const len = data.length;
    if (len !== 0) {
      this.maxCreatedAt = data[len - 1].created_at;
    }
    if (len < 20) {
      this.hideButton();
    }
  }

  hideButton() {
    $(this.$el.find('button.fetch-more')).replaceWith("<b>No more tweets!</b>");

  }

}

module.exports = InfiniteTweets;