const APIUtil = require("./api_util");

class TweetCompose {
  constructor() {
    this.$form = $("form.tweet-compose");
    this.submit();
  }
  
  submit() {
    
    this.$form.on("submit", event => {
      event.preventDefault();
      const data = $(event.currentTarget).serializeJSON();
      this.$form.find(':input').prop('disabled', true);
      const resp = APIUtil.createTweet(data);
      resp.then(tweet => this.handleSuccess(tweet));
      
      return resp;
    });
  }
  
  clearInput() {
    this.$form.find("textarea").val("");
    this.$form.find(':input').prop('disabled', false);
  }


  handleSuccess(data) {
    this.clearInput();
    const $tweetsUl = $(this.$form.data('tweets-ul'));
    const $li = $("<li></li>").text(data.content);
    $tweetsUl.prepend($li);
    
  }

}

module.exports = TweetCompose;