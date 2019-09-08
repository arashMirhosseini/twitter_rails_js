const APIUtil = require("./api_util");

class TweetCompose {
  constructor() {
    this.$form = $("form.tweet-compose");
    this.$input = this.$form.find('textarea[name=tweet\\[content\\]]');
    this.$input.on('input', this.handleInput.bind(this));
    this.submit();
    this.addMentionUser();
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
    const $li = $("<li></li>");
    this.addTweet($li, data);
    $tweetsUl.prepend($li);
  }

  handleInput(event) {
    const inputLength = this.$input.val().length;
    this.$form.find(".chars-left").text(`${140 - inputLength} characters left`);
  }


  addMentionUser() {
    this.$form.find(".add-mentioned-user").on("click", event => {
      event.preventDefault();
      this.newUserSelect();
    });
  }

  newUserSelect() {
    const users = window.users;
    const $select = $("<select></select>");
    const $div = $("<div></div>");
    console.log(users);
    users.forEach(user => {
      const $option = $("<option></option>");
      $option.attr("value", user.id);
      $option.text(user.username);
      $select.append($option);
    });
    $div.append($select);
    this.$form.find(".mentioned-users").append($div);
  }

  addTweet($li, data) {
    const $div = $("<div></div>").addClass("tweet");
    $li.append($div);
    const $h3 = $("<h3></h3>").addClass("tweeter");
    const $aUser = $("<a></a>").text(data.user.username);
    $aUser.attr("href", "");
    const $p = $("<p></p>").text(data.content);
    $h3.append($aUser);
    $div.append($h3);
    $div.append($p);

  }

}

module.exports = TweetCompose;