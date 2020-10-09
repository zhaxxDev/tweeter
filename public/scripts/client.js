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

 
function handleComposeSubmit(event) {
  event.preventDefault();
  var formDataStr = $(this).serialize();
  var textAreaContent = $('#tweet-text').val();
  if(textAreaContent === '') {
    return $("#invalidE").slideToggle("slow", function (){});
  } else if (textAreaContent.length > 140) {
    return $("#invalidE").slideToggle("slow", function (){});
  } else {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formDataStr
    }).done(function(data) {
      $('#tweet-text').val('');
      $('.counter').html(140);
      loadTweets();
      $(".new-tweet").slideToggle("slow", function (){});
    });
  }
}

function loadTweets() {
  $.ajax({
    url: `/tweets`,
    method: 'GET',
    dataType: "json",
    success: function (data) {
      console.log('Success: ', data);
      renderTweets(data);
    }
  });
}

function getTheCurrentTime(date) {
  var currentDate = Date.now();
  var howLongAgoSeconds = (currentDate - date) / 1000 / 60;
  var howLongAgoMinutes = (currentDate - date) / 1000 / 60;
  var howLongAgoHours = (currentDate - date) / 1000 / 60 / 60;
  if (howLongAgoMinutes < 1) {
    return `${Math.floor(howLongAgoSeconds)} seconds ago`;
  } else if (howLongAgoMinutes > 1 && howLongAgoMinutes < 60) {
    return `${Math.floor(howLongAgoMinutes)} minutes ago`;
  } else if (howLongAgoMinutes > 60 && howLongAgoHours < 24) {
    return `${Math.floor(howLongAgoHours)} hours ago`;
  } else if (howLongAgoHours > 24) {
    return `${Math.floor(howLongAgoHours / 24)} days ago`;
  }
}

//to make text not be able to run as html
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement (tweetObj) {
  $tweet = $("<article>").addClass("tweet");
  const safeHTML = `<p id="tweetText">${escape(tweetObj.content.text)}</p>`;
  console.log(safeHTML)
  let html = 
  ` 
    <header class="nameData">
      <img src=${tweetObj.user.avatars}/>
      <p>${tweetObj.user.name}</p>
      <i>${tweetObj.user.handle}</i>
    </header>
    <div class="tweetData">
      ${safeHTML}
    </div>
    <footer>  
      <p><i>${getTheCurrentTime(tweetObj.created_at)}</i></p>
    </footer>
  `;
  $tweet = $tweet.append(html);
  return $tweet;
}

function renderTweets(tweets) {
  var $html = $(".all-tweets");
  $html.empty()
  tweets.forEach((tweet)=> {
    var a = createTweetElement(tweet);
    $html.prepend(a);
  })
  // $(".all-tweets").html($html);
}

$(document).ready(function() {
  $(".new-tweet").hide();
  $("#invalidE").hide();
  loadTweets();
  console.log('loadtweets function invoked successfully');
  $('#compose').on('submit', handleComposeSubmit);
  $("#navButton").click(function(){
    $(".new-tweet").slideToggle("slow", function (){});
  });
});