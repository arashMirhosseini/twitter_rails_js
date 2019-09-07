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
  } 

};

module.exports = APIUtil;