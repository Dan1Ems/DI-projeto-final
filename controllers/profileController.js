const path = require("path");
const db = require(path.join(__dirname, "..", "database", "database.js"));

function showProfile(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "profile.html"));
}

function getProfile(req, res) {
    const profile = db.prepare(`
        SELECT username FROM users
        WHERE id = ?    
    `).get(req.session.userId);

    if (!profile) {
        return res.status(404).send("Profile not found");
    }

    res.json(profile);
}

module.exports = {
    showProfile,
    getProfile
}