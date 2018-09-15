

var movies = ["The Matrix", "Kill Bill", "Frank Zappa", "Gremlins", "Mike Portnoy", "Lou Reed", "Top Gear"];


function renderButtons() {

  $(movies).each(function(i,element) {
    var b = $("<button>");
      $(b).text(element);
      $(b).attr("class","movie-b");
    $("#movies-view").append(b);
  });

}




$("#add-movie").on("click", function() {
  event.preventDefault();
  var movie = $("#movie-input").val();
  movies.push(movie);
  $("#movies-view").empty();
  renderButtons();
  click();

});

renderButtons();

function click() {
  $(".movie-b").click(function() {
    console.log(event);
    var movie = event.srcElement.innerText;
    $.ajax({
      url: "https://api.giphy.com/v1/gifs/search",
          method: "GET",
          data:{q:movie,"api_key":"2E0td7QshXaYz3LAhXOoSIJm5rERcRth",limit:"10"}

      }).then(function(response) {
        if(response.data.length == 10) {
          console.log(response);
          var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var personImage = $("<img>");
      personImage.attr("src", results[i].images.fixed_height_still.url);
      personImage.attr("data-still",results[i].images.fixed_height_still.url); 
      personImage.attr("data-animate", results[i].images.fixed_height.url);
      personImage.attr("data-state", "still");
      personImage.attr("class", "gif");

      gifDiv.prepend(p);
      gifDiv.prepend(personImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  gifState();
          
          
        } else {
          alert("Tu mama");
        }
      }); 
  });
};


click();

function gifState(){
$(".gif").on("click", function() {

var state = $(this).attr("data-state");

if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});
};





