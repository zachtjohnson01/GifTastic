$(document).ready(function() {

    $("#buttons-appear-here").append("<button data-gif='sunrise'>sunrise</button>");


    $("button").on("click", function() {
        // Grabbing and storing the data-gif property value from the button
        var gif = $(this).attr("data-gif");

        // Constructing a queryURL using the gif name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

        
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(queryURL);
            console.log(response);
            
            // Storing the data from AJAX request in the results variable
            var results = response.data
            
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                
                // Creating and storing a div tag
                var gifDiv = $("<div>");
                
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                
                // Creating and storing an image tag
                var gifImage = $("<img>");
                
                // Setting the src attribute of the image to a property pulled off the result item
                gifImage.attr("src", results[i].images.fixed_height.url);
                
                // Appending the paragraph and image tag to the gifDiv
                gifDiv.append(p);
                gifDiv.append(gifImage);
                
                // Prepending the gifDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
    });
        
});