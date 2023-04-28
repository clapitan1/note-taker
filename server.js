const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", (req, res) => {
    const notesData = fs.readFileSync(path.join(__dirname, "db", "db.json"));
    res.json(JSON.parse(notesData));
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
  
    const notesData = fs.readFileSync(path.join(__dirname, "db", "db.json"));
    const notes = JSON.parse(notesData);
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, "db", "db.json"), JSON.stringify(notes));
  
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));