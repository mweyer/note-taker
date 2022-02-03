const fs = require("fs");

let noteData;
noteData = require("../../../db/db.json");
let noteArray = noteData;

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    // noteData = require("../../../db/db.json");
    // noteArray = noteData;
    res.json(noteArray);
    console.log(noteArray);
  });

  app.post("/api/notes", function (req, res) {
    noteArray.push(req.body);
    for (let note in noteArray) {
      noteArray[note].id = note;
    }
    fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {
      if (err) {
        return console.log(err);
      }
      res.send("Inserted note " + req.title);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const x = req.params.id;

    noteArray = noteArray.filter(function (value, index, arr) {
      return value.id !== x;
    });

    for (let note in noteArray) {
      noteArray[note].id = note;
    }

    fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {
      if (err) {
        return console.log(err);
      }
    });

    res.send("Deleted id " + x);
  });
};