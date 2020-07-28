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
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
    console.log(path.join(__dirname, "./Develop/public/index.html"));
});

// Route for notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
    console.log(path.join(__dirname, "./Develop/public/notes.html"));
});

// API ROUTES//
// GET route for getting note data
app.get("/api/notes", function (req, res) {
    fs.readFile("./Develop/db/db.json", "utf8", function(err,response) {
        if (err) throw err;
        res.json(JSON.parse(response));
    });
});

// POST route for adding new notes via JSON, and displaying it
app.post("/api/notes", function (req, res) {
    const noteReq = req.body;
    fs.readFile("./Develop/db/db.json", "utf8", function (err, response) {
        if (err) {
            console.log(err);
        }
        const notes = JSON.parse(response);
        const newNotes = {
            id: notes.length + 1,
            title: noteReq.title,
            text: noteReq.text
        };
        
        console.log(newNotes);
        notes.push(newNotes);

        fs.writeFile("./Develop/db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err;
            return res.json(notes);
        });
    });
});
    // Route for deleting notes 
app.delete("/api/notes/:id", function (req, res) {
    const deleteID = req.params.id;
    fs.readFile("./Develop/db/db.json", "utf8", function (err, data) {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        res.json(savedNotes);

        fs.writeFile("./Develop/db/db.json", JSON.stringify(savedNotes), 
        function(err, data) {
            console.log("Notes deleted");
            res.json(savedNotes);
        })
    });

});

// Starts the server to begin listening

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
}); 