$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var confessionInput = $("#confesion");
  var confessionList = $("tbody");
  var confessionContainer = $(".confession-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#confession-form", handleConfessionFormSubmit);
  $(document).on("click", ".delete-confession", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getConfessions();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleConfessionFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!confessionInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertConfession({
      name: confessionInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getConfessions upon completion
  function upsertConfession(confessionData) {
    $.post("/api/authors", confessionData)
      .then(getconfessions);
  }

  // Function for creating a new list row for authors
  function createConfessionRow(confessionData) {
    var newTr = $("<tr>");
    newTr.data("author", confessionData);
    newTr.append("<td>" + confessionData.name + "</td>");
    if (authorData.Posts) {
      newTr.append("<td> " + confessionData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/blog?author_id=" + confessionData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + confessionData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getConfessions() {
    $.get("/api/authors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createConfessionRow(data[i]));
      }
      renderConfessionList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderConfessionList(rows) {
    confessionList.children().not(":last").remove();
    confessionContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Post.");
    confessionContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/author/" + id
    })
      .then(getConfessions);
  }
});
