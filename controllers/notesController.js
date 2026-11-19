const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));

function showNotes(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "notes.html"));
}

function createNote(req, res) {

}

module.exports = {
    showNotes,
    createNote
}