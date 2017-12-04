//first layout the html, rows and colums to display the data
//get a function that creates a new box with every search

var actor = ["Harry Potter", "Hermonie Granger", "Ron Weasley"];

$("#buttonDiv").on("click", function (event) {
    
    var clicked = $(this).val();
    console.log(clicked);



});


function renderButtons() {

    // Deleting the actor buttons prior to adding new actor buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonDiv").empty();

    // Looping through the array of movies
    for (var i = 0; i < actor.length; i++) {

        // Then dynamicaly generating buttons for each actor in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("btn btn-lg btn-warning");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", actor[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(actor[i]);

              // Adding the button to the HTML
        $("#buttonDiv").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-search").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var choice = $("#userSearch").val().trim();
    // The movie from the textbox is then added to our array
    actor.push(choice);


    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();


$("#add-search").on("click", function (event) {

    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    var typed = $("#userSearch").val().trim();

    // Here we construct our URL
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + typed + "&api_key=WOKx9oTRibMs6vJP9NRHljx1clYCkpXg&limit=10";

    //ajax call to get the data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log("API Response ", response);

        //loop throught the response and log urls and ratings
        for (i = 0; i < response.data.length; i++) {
            console.log("Still Link: " + response.data[i].images.fixed_height_still.url);
            console.log("Animated Link: " + response.data[i].images.fixed_height.url);
            console.log("Movie Rating: " + response.data[i].rating);

            //give all the new divs the same class
            var gifDiv = $("<div class='gif'>");
            gifDiv.attr("data-state", "still");
            gifDiv.attr("data-still", gifUrlStill);
            gifDiv.attr("data-animate", gifUrlAnimate);

            //RATINGS
            //store the rating in a variable
            var rating = response.data[i].rating;
            //create an element to display the rating
            var ratingDisplay = $("<p>").text(JSON.stringify("GIF Rating: " + rating));
            //display the rating
            gifDiv.append(ratingDisplay);


            //IMAGES
            //store the still images in a variable
            var gifUrlStill = response.data[i].images.fixed_height_still.url;

            //store the animated images in a variable

            var gifUrlAnimate = response.data[i].images.fixed_height.url;
            //gifUrlAnimate.attr("data-state","animate")


            //create an element to display the image
            var gifDisplay = $("<img>").attr("src", gifUrlStill);
            console.log(gifDisplay);

            //display the image
            gifDiv.append(gifDisplay);

            //this should dump whatever is in the div to the html
            $("#gifData").prepend(gifDiv);

        }
        //click handeler for clicking the image.
        $(".gif").on("click", function () {


            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).children().attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {

                $(this).children().attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }



        });

    });

});