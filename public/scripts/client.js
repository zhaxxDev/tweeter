/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

function createTweetElement (tweetObj) {
  $tweet = $("<article>").addClass("tweet");
  let html = ` <div class="nameData">
  <img src=${tweetObj.user.avatars.small} alt="user-avatar" />
  <p>${tweetObj.user.name}</p>
  <i>${tweetObj.user.handle}</i>
</div>
<div class="tweetData">
  <p id="tweetText">${tweetObj.content.text}</p>
  <p>${getTheCurrentTime(tweetObj.created_at)}</p>
</div>`;
  $tweet = $tweet.append(html);
  return $tweet;
}

function renderTweets(tweets) {
  var $html = $('<div></div>');
  tweets.forEach((tweet)=> {
    var a = createTweetElement(tweet);
    $html.prepend(a);
  })
  $(".all-tweets").html($html);
}

renderTweets(data);