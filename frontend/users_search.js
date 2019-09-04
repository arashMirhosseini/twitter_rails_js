const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find("ul.users");
    this.handleInput();
  }

  renderResults(user) {
    this.$ul.find("li").remove();
    const $li = $("<li></li>");
    $li.text(user);
    this.$ul.append($li);
  }

  handleInput() {
    const that = this;
    this.$el.on("input", "input:text", event => {
      event.preventDefault();
      const resp = APIUtil.searchUsers(this.$input.val());
      resp.then(function (users) {
        users.forEach(user => {
          const userName = user.username;
          that.renderResults(userName);
        });
      });
    });
    
  }

}

module.exports = UsersSearch;