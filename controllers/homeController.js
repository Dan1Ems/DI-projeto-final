const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));

function showHome(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
}

module.exports = {
    showHome
}