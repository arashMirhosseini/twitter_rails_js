const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");

$(() => {
  const $buttons = $("button");
  const $navs = $("nav.users-search");
  $buttons.each(function(idx) {
    const $button = $($buttons[idx]);
    const fol = new FollowToggle($button);
  });
  
  $navs.each(function(idx) {
    const $nav = $($navs[idx]);
    // console.log($nav.find("li"));
    const nav = new UsersSearch($nav);
    console.log(nav);
  });
});