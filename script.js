$(document).ready(function() {

var topics = ["Baseball", "Basketball", "Football", "Hockey", "Boxing", "Soccer", "Wrestling", "Volleyball", "Bowling", "Tennis", "Softball"];

function button_func(){
	$("#sportsButtons").empty();
	
	for (var i = 0; i < topics.length; i++){
		var newButton = $("<button>");
		newButton.addClass("gif");
		newButton.attr("data-name", topics[i]);
		newButton.text(topics[i]);
		$("#sportsButtons").append(newButton);
	};
};

button_func();

$("#submit").on("click", function(add){
	add.preventDefault();
	var newGif = $("#newGif").val().trim();
	topics.push(newGif);
	button_func();
});

function gif_func(){
	$("#sportsGifs").empty()
	var thisData = $(this).data("name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisData + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})

	.done(function(res){
		var results = res.data;

		for (var i = 0; i < results.length ; i++) {
			var newDiv = $("<div class='gify'>");
			var ratingText = $("<p>").text("Rating: " + rating);
			var rating = results[i].rating;
			var img = $("<img>");

			img.attr("src", results[i].images.fixed_height.url);
			newDiv.prepend(ratingText);
			newDiv.prepend(img);
		
			$("#sportsGifs").prepend(newDiv); 
		}
	});
}
	$(document).on("click", ".gif", gif_func);
});