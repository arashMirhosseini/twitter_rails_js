const FollowToggle = require("./follow_toggle");

$(() => {
  const $buttons = $("button");
  $buttons.each(function(idx) {
    const $button = $($buttons[idx]);
    const fol = new FollowToggle($button);
    // console.log(typeof fol.userId);
    
  });
});