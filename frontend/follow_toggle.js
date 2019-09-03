class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data("userId");
    this.followState = $el.data("initialFollowState");
    this.render();
  }

  render() {
    const buttonText = this.followState === true ? "Unfollow!" : "Follow!";
    this.$el.text(buttonText);
  }
}

module.exports = FollowToggle;