// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2104;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for css page
app.use(express.static("Develop/public/assets/css"));

// Route for index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// Route for notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  }); 