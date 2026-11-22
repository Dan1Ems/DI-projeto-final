const path = require("path");

function showRequirements(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "requirements.html"));
}

module.exports = {
    showRequirements
}