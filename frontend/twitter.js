const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");

$(() => {
  const $navs = $("div.users-search");
  
  $navs.each(function(idx) {
    const $nav = $($navs[idx]);
    const nav = new UsersSearch($nav);
  });
  new TweetCompose();
});