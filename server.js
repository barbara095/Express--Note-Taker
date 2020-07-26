// Dependencies

const fs = require("fs");
const express = require("express");
const path = require("path");
const noteData = require("./Develop/db/db.json")


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 2104;

// Sets up the Express app to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for css page
app.use(express.static("Develop/public"));

// HTML ROUTES//
// Route for index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// Route for notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// API ROUTES//
// GET route for getting note data
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, noteData), function(err,data) {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// POST route for adding new notes via JSON, and displaying it
app.post("/api/notes", function(req, res) {
    const newNotes = req.body;
    console.log(newNotes);
    noteData.push(newNotes);

    fs.readFile(path.join(__dirname, noteData), function(err,data) {
        if (err) throw err;
        const notes = JSON.parse(data);

        newNotes.id = notes.length + 1;
    
        fs.writeFile(path.join(__dirname, noteData, JSON.stringify(notes)), function(err) {
            if (err) throw err;
            res.send("Success!");
        });
    });
});

// Route for deleting notes 
app.delete("/api/notes/:id", function(req, res) {
    fs.readFile(path.join(__dirname, noteData), function(err,data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        console.log(savedNotes);
        res.json(savedNotes);
    });

});

// Starts the server to begin listening

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  }); 