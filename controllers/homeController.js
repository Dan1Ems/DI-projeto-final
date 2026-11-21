const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));

function showIndex(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
}

function showHome(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "home.html"));
}

module.exports = {
    showIndex,
    showHome
}