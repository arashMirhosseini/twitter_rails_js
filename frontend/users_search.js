const APIUtil = require("./api_util");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find("input");
    this.$ul = $el.find("ul");
    this.handleInput();
  }

  render() {
    
  }

  handleInput() {
    this.$el.on("input", "input:text", event => {
      event.preventDefault();
      const resp = APIUtil.searchUsers(this.$input.val());
      console.log(resp);
    });
    
  }

}

module.exports = UsersSearch;