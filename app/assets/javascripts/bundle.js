/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  feedReq: () => {
    return APIUtil.makeReq("GET", "/feed", null);
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

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = 
      this.$el.data("userId") || options.userId;
    this.followState = 
      this.$el.data("initialFollowState") || options.followState;
    this.render();
    this.handleClick();
  }

  render() {
    const buttonText = this.followState === true ? "Unfollow!" : "Follow!";
    this.$el.text(buttonText);
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

/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class InfiniteTweets {
  constructor(el) {
    this.$el = $(el);
    this.maxCreatedAt = null;
    this.fetchTweets();
  }

  fetchTweets() {
    const resp = APIUtil.feedReq();
    resp.then(tweets => this.insertTweets(tweets));
  }

  insertTweets(data) {
    const $tweetsUl = $(this.$el.find('ul.tweets'));
    data.forEach(tweet => {
      const $li = $("<li></li>");
      APIUtil.addTweet($li, tweet);
      $tweetsUl.append($li);
    });

  }

}

module.exports = InfiniteTweets;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

class TweetCompose {
  constructor(el) {
    this.$form = $(el);
    this.$input = this.$form.find('textarea[name=tweet\\[content\\]]');
    this.$input.on('input', this.handleInput.bind(this));
    this.submit();
    this.addMentionUser();
    
  }
  
  submit() {
    
    this.$form.on("submit", event => {
      event.preventDefault();
      const data = $(event.currentTarget).serializeJSON();
      this.$form.find(':input').prop('disabled', true);
      const resp = APIUtil.createTweet(data);
      resp.then(tweet => this.handleSuccess(tweet));
      
      return resp;
    });
  }
  
  clearInput() {
    this.$form.find("textarea").val("");
    this.$form.find(".mentioned-users").find('ul').empty();
    this.$form.find(':input').prop('disabled', false);
    this.$form.find('.char-left').empty();

  }


  handleSuccess(data) {
    const $tweetsUl = $(this.$form.data('tweets-ul'));
    const $li = $("<li></li>");
    APIUtil.addTweet($li, data);
    $tweetsUl.prepend($li);
    this.clearInput();
  }

  handleInput(event) {
    const inputLength = this.$input.val().length;
    this.$form.find(".char-left").text(`${140 - inputLength} characters left`);
  }


  addMentionUser() {
    const that = this;
    this.$form.find(".add-mentioned-user").on("click", event => {
      event.preventDefault();
      this.newUserSelect();
      that.removeMentionedUser();

    });
  }

  newUserSelect() {
    const users = window.users;
    const $select = $("<select name='tweet[mentioned_user_ids][]'></select>");
    const $div = $("<div></div>");
    users.forEach(user => {
      const $option = $("<option></option>");
      $option.attr("value", user.id);
      $option.text(user.username);
      $select.append($option);
    });
    $div.append($select);
    const $a = $("<button class='remove-mentioned-user'>Remove</button>");
    $div.append($a);
    this.$form.find(".mentioned-users").append($div);
  }

  // addTweet($li, data) {
  //   const $div = $("<div></div>").addClass("tweet");
  //   $li.append($div);
  //   const $h3 = $("<h3></h3>").addClass("tweeter");
  //   const $aUser = $("<a></a>").text(data.user.username);
  //   $aUser.attr("href", "");
  //   const $p = $("<p></p>").text(data.content);
  //   $h3.append($aUser);
  //   $div.append($h3);
  //   $div.append($p);

  // }

  removeMentionedUser() {
    const $ulMentionedUser = this.$form.find("button.remove-mentioned-user");
    $ulMentionedUser.on(
      'click',
      event => {
        event.preventDefault();
        $(event.currentTarget).parent().remove();
      }
    );

  }

  
}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose */ "./frontend/tweet_compose.js");
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets */ "./frontend/infinite_tweets.js");

$(() => {
  $('div.infinite-tweets').each((i, tweet) => new InfiniteTweets(tweet));
  $('form.tweet-compose').each((i, form) => new TweetCompose(form));
  $('.users-search').each((i, search) => new UsersSearch(search));
  $('button.follow-toggle').each((i, btn) => new FollowToggle(btn, {}));

});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.find("input");
    this.$ul = this.$el.find("ul.users");
    this.handleInput();
  }

  renderResults(user, options) {
    this.$ul.find("li").remove();
    const $li = $("<li></li>");
    $li.text(user);
    this.$ul.append($li);
    this.addFollowToggle($li, options)
  }
  
  addFollowToggle($li, options) {
    this.$ul.find("button").remove();
    const $button = $("<button></button>");
    $li.append($button);
    new FollowToggle($button, options);
  }

  handleInput() {
    const that = this;
    this.$el.on("input", "input:text", event => {
      event.preventDefault();
      const resp = APIUtil.searchUsers(this.$input.val());
      resp.then(function (users) {
        users.forEach(user => {
          const userName = user.username;
          that.renderResults(userName, {
            userId: user.id,
            followState: user.followed
          });
        });
      });
    });
    
  }

}

module.exports = UsersSearch;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map