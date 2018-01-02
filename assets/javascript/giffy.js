var animals =["pig", "dog", "wolf", "giraffe", "elephant","cow","elk","koala","gorilla","jaguar"];
var animalImage;
var state;
function displayAnimalGif (){
  var animal = $(this).data("name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=H5NnYWud8bpvU4ICC178EnuAHbGH056M&limit=10_s";
  $.ajax({
    url: queryURL,
    method:'GET'
  }).done(function(response){
       $("#gifs-here").empty();
        var results = response.data;
         for (var i = 0; i < results.length; i++) {

            animalDiv = $("<div>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate",results[i].images.fixed_height.url);
            animalImage.attr("data-still",results[i].images.fixed_height_still.url);
            animalImage.attr("data-state","still");
            animalImage.addClass("gif");

            animalDiv.append(p);

            animalDiv.append(animalImage);

            $("#gifs-here").append(animalDiv);

            animalDiv.css({'float':'left'});
            animalDiv.css({'margin-right':'5px'});
          }
      });
}
function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < animals.length; i++) {

          var animalBtn = $("<button>");
          
          animalBtn.addClass("animal btn btn-primary");
         
          animalBtn.attr("data-name", animals[i]);
         
          animalBtn.text(animals[i]);
          
          $("#buttons").append(animalBtn);
        }
      }

      
      $("#submit-animal").on("click", function(event) {
        event.preventDefault();
      
        var animal = $("#add-animal").val().trim();

        animals.push(animal);

        renderButtons();
      });
        renderButtons();
       
  $(document).on("click", ".animal", displayAnimalGif);
  $(document).on("click",".gif",function(){
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  });


     