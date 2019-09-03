class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = $el.data("userId");
    this.followState = $el.data("initialFollowState");
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
      let req = that.followState === true ? "DELETE" : "POST";
      console.log(req);
      $.ajax({
        type: req,
        url: "/users/" + that.userId.toString() + "/follow",
        dataType: 'json',
        success() {
          that.followState = that.followState === true ? false : true;
          that.render()
        } 
      });
      
    });
  }

}

module.exports = FollowToggle;