// Grab the articles as a json
// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  var currentArticle = $(this).attr("data-id");
  renderNotes(currentArticle);
});

function renderNotes(currentArticle){
  $("#notes").empty();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + currentArticle
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

      var notes = data.note;
      console.log(notes);

      if(notes.length>0) {


        for (let i = 0; i < notes.length; i++) {
         $("#notes").append(
           //paste from shelly**
           "<h4>" +
              notes[i].body +
              "  " +
              "<button id='delete-note' article-id='" +
              currentArticle +
              "'  data-id='" +
              notes[i]._id +
              "' >x</button></h4>"
         )
        }
      }

      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
    
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
     
    });
}
// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      renderNotes(thisId);
    });

  // Also, remove the values entered in the input and textarea for note entry
 
  $("#bodyinput").val("");
});

$(document).on("click", "#delete-note", function() {
  // Grab the id associated with the article from the submit button
  var currentNote = $(this).attr("data-id");
  var currentArticle = $(this).attr("article-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/delete/" + currentNote,
    
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log("note deleted");
      // Empty the notes section
      // $("#notes").empty();
      renderNotes(currentArticle);
    });

  // Also, remove the values entered in the input and textarea for note entry
 
  $("#bodyinput").val("");
});