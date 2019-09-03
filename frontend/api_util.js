const APIUtil = {
  followUser: id => {
    // console.log(this);
    return APIUtil.makeReq("POST", id);
  },

  unfollowUser: id => {

    return APIUtil.makeReq("DELETE", id);
  },

  makeReq: (action, id) => {
    const resp = $.ajax({
      type: action,
      url: "/users/" + id.toString() + "/follow",
      dataType: "json"
    });
    return resp;
  } 

};

module.exports = APIUtil;