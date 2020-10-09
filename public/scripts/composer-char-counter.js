$(document).ready(function() {
  $("#tweet-text").keyup(function(){
    var counter = $(this).closest(".new-tweet").find(".counter");
    let remaining = 140 - $(this).val().length;
      counter.text(remaining)
      console.log(remaining)
      if (remaining < 0) {
        counter.addClass("red");
      } else {
        counter.removeClass("red");
      }
  })
  
});


