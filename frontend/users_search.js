const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find("ul.users");
    this.handleInput();
  }

  renderResults(user, options) {
    this.$ul.find("li").remove();
    this.$ul.find("button").remove();
    const $li = $("<li></li>");
    $li.text(user);
    this.$ul.append($li);
    this.addFollowToggle($li, options)
  }
  
  addFollowToggle($li, options) {
    const $button = $("<button></button>");
    $li.append($button);
    new FollowToggle($button, options);
  }

  handleInput() {
    const that = this;
    this.$el.on("input", "input:text", event => {
      event.preventDefault();
      const resp = APIUtil.searchUsers(this.$input.val());
      resp.then(function (users) {
        users.forEach(user => {
          const userName = user.username;
          that.renderResults(userName, {
            userId: user.id,
            followState: user.followed
          });
        });
      });
    });
    
  }

}

module.exports = UsersSearch;