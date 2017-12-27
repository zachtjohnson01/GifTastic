$(document).ready(function() {

    // Initial array of gifs
    var gifs = ["dog", "cat", "rabbit", "hamster", "skunk"];


    function displaygif() {
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
    };

    function renderButtons() {
        
        // Deleting the gifs prior to adding new gifs
        // Necessary to avoid repeat buttons
        $("#buttons-appear-here").empty();

        // Looping through array of gifs
        for (var i = 0; i < gifs.length; i++) {

            // Dynamically create buttons for each gif in array
            var a = $("<button>");
            // Adding gif class
            a.addClass("gif");
            // Adding data-gif attribute
            a.attr("data-gif",gifs[i]);
            // Providing the initial button text
            a.text(gifs[i]);
            // Adding the button to the buttons-appear-here div
            $("#buttons-appear-here").append(a);
        }
    }

    $("#add-gif").on("click",function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif form the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our gifs array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "gif"
    $(document).on("click",".gif", displaygif);

    // Calling the renderButtons function to display the initial buttons
    renderButtons();
        
});