const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));

function showNotes(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "notes.html"));
}

function showNote(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "note.html"));
}

function createNote(req, res) {
    
}

function getNotes(req, res) {
    const notes = db.prepare(`
        SELECT * FROM notes
    `).all();

    res.json(notes);
}

function getMyNotes(req, res) {
    const notes = db.prepare(`
        SELECT * FROM notes WHERE user_id = ?
    `).all(req.session.userId);

    res.json(notes);
}

function getOtherNotes(req, res) {
    const notes = db.prepare(`
        SELECT * FROM notes WHERE user_id != ?
    `).all(req.session.userId);

    res.json(notes);
}

function getNote(req, res) {
    const noteId = req.params.id;

    const note = db.prepare(`
        SELECT * FROM notes
        WHERE id = ?      
    `).get(noteId);

    if (!note) {
        return res.status(404).send("Note not found")
    }

    res.json(note);
}

module.exports = {
    showNotes,
    showNote,
    createNote,
    getNotes,
    getMyNotes,
    getOtherNotes,
    getNote
}