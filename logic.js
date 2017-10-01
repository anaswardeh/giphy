$(document).ready(function() {

    var animalsArr = [
        "Dog",
        "Baboon",
        "Badger",
        "Eagle",
        "Ape",
        "Leopard",
        "Caterpillar",
        "Cat",
        "Camel",
        "Chicken",
        "Clam",
        "Clownfish",
        "Blue jay",
        "Bobcat",
        "Elephant",
        "Fox",
        "Frog",
        "Falcon",
        "Bird",
        "Kangaroo",
        "Kiwi",
        "Giraffe",
        "Rabbit",
        "Hamster",
        "Skunk",
        "Goldfish",
        "Ferret",
        "Turtle",
        "Hedgehog",
        "Goat"
    ]



    $("#add-animal").on("click", function() {
        var newArray = $("#animal-input").val();
        animalsArr.push(newArray);
        $("#animal-input").val('');
        $("#animals-buttons").empty();
        createButtons();
    });



    function createButtons() {
        for (var i = 0; i < animalsArr.length; i++) {
            var buttons = $('<button id=' + animalsArr[i] + ' class="btn btn-info custom-button"> ' + animalsArr[i] + '</button>')
            $("#animals-buttons").append(buttons);
        }
        $("#animals-buttons").on("click", function(event) {
            animal = event.target.id;
        });
    }



    createButtons();


    $("#animals-buttons").on("click", function appendNew() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=uqsCr3TUU6BLXossJIOndetBEYMfgigL&limit=10";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                //var origResults = response.data;
               	//var results = origResults.slice(1, 11);

               	var results = response.data;

                if ($("#animals").html().length > 0) {
                    $("#animals").empty();
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var animalDiv = $("<div>");
                            animalDiv.attr("id", "container");

                            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                            var animalImage = $("<img>").addClass("gif");

                            animalImage.attr("src", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-animate", results[i].images.fixed_height.url);
                            animalImage.attr("data-state", "still");
                            animalImage.attr("data-state", "animate");

                            animalDiv.append(p);
                            animalDiv.append(animalImage);
                            $("#animals").append(animalDiv);


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

                        }
                    }
                } else {

                    for (var i = 0; i < results.length; i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            animalDiv = $("<div>");
                            animalDiv.attr("id", "container");

                            p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                            animalImage = $("<img>").addClass("gif");

                            animalImage.attr("src", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                            animalImage.attr("data-animate", results[i].images.fixed_height.url);
                            animalImage.attr("data-state", "still");
                            animalImage.attr("data-state", "animate");

                            animalDiv.append(p);
                            animalDiv.append(animalImage);
                            $("#animals").append(animalDiv);


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

                        }
                    }
                }
            });
    });
});