const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "middleware", "authMiddleware"));
const profileController = require(path.join(__dirname, "..", "controllers", "profileController.js"));

router.get("/",
    requireAuth,
    profileController.showProfile
);

module.exports = router;