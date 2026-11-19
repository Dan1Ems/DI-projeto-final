const path = require("path");
const express = require("express");

function showProfile(req, res) {
    res.sendFile(path.join(__dirname, "..", "views", "profile.html"));
}

module.exports = {
    showProfile
}