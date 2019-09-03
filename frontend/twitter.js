const FollowToggle = require("./follow_toggle");

$(() => {
  const $buttons = $("button");
  $buttons.each(function(idx) {
    console.log($buttons[idx]);
    const $button = $($buttons[idx]);
    new FollowToggle($button);
    
  });
});