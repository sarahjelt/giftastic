var topics = ["frodo baggins", "samwise gamgee", "meriadoc brandybuck", "peregrin took", "gandalf", "gollum", "aragorn", "gimli", "legolas", "boromir"];

// on clicking buttons with search terms load gifs and rating
function renderGifs() {
  console.log("running");
  var buttonText = $(this).attr("data-img");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=dc6zaTOxFJmzC&limit=10";
  $("#gifs-go-here").empty();

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item col-md-4'>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var img = $("<img>");
      img.attr("src", results[i].images.fixed_height_still.url);
      img.attr("data-still", results[i].images.fixed_height_still.url);
      img.attr("data-animate", results[i].images.fixed_height.url);
      img.attr("data-state", "still");
      img.addClass("gif");

      gifDiv.prepend(p);
      gifDiv.prepend(img);
      $("#gifs-go-here").prepend(gifDiv);
    }
  })
};

//renders new button with latest topics array push
function renderButtons() {
  $("#buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("new-button");
    newButton.attr("data-img", topics[i]);
    newButton.text(topics[i]);
    $("#buttons").append(newButton);
  }
}

//on click, adds new button to gif buttons array
$("#add-new-button").on("click", function(event) {
  event.preventDefault();
  var searchTerm = $("#form-text").val().trim();
  topics.push(searchTerm);
  renderButtons();
  })

//trigger still or animated
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  console.log(state);

  if (state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
})

renderButtons();

$(document).on("click", "button", renderGifs);
