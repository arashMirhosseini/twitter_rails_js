const APIUtil = {
  followUser: id => {
    const url = "/users/" + id.toString() + "/follow";
    return APIUtil.makeReq("POST", url, {});
  },

  unfollowUser: id => {
    const url = "/users/" + id.toString() + "/follow";
    return APIUtil.makeReq("DELETE", url, {});
  },

  searchUsers: queryVal => {
    const url = "/users/search";
    const query = {query: queryVal};
    return APIUtil.makeReq("GET", url, query);
  },

  createTweet: data => {
    const url = "/tweets";
    return APIUtil.makeReq("POST", url, data);
  },

  feedReq: query => {
    return APIUtil.makeReq("GET", "/feed", query);
  },

  makeReq: (action, url, data) => {
    const resp = $.ajax({
      type: action,
      url: url,
      data: data,
      dataType: "json",
      success: function (dataResp) {
        return dataResp;
      }
    });
    return resp;
  },
  
  addTweet: ($li, data) => {
    const $div = $("<div></div>").addClass("tweet");
    $li.append($div);
    const $h3 = $("<h3></h3>").addClass("tweeter");
    const $aUser = $("<a></a>").text(data.user.username);
    $aUser.attr("href", "");
    const $p = $("<p></p>").text(data.content);
    $h3.append($aUser);
    $div.append($h3);
    $div.append($p);

  }

};

module.exports = APIUtil;