const APIUtil = require("./api_util");

class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = 
      this.$el.data("userId") || options.userId;
    this.followState = 
      $el.data("initialFollowState") || options.followState;
    this.render();
    this.handleClick();
  }

  render() {
    const buttonText = this.followState === true ? "Unfollow!" : "Follow!";
    this.$el.text(buttonText);
    console.log(this);
  }
  
  handleClick() {
    const that = this;
    this.$el.on("click", (event) => {
      event.preventDefault();
      
      that.$el.prop("disabled", true);
      let resp;
      if (that.followState) {
        resp = APIUtil.unfollowUser(that.userId);
        that.followState = false;
      } else {
        resp = APIUtil.followUser(that.userId);
        that.followState = true;
      }
      resp.then(that.render());

      that.$el.prop("disabled", false);
      
    });
  }

}

module.exports = FollowToggle;