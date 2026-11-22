const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "..", "middleware", "authMiddleware.js"));
const profileController = require(path.join(__dirname, "..", "..", "controllers", "profileController.js"));

router.use("/",
    requireAuth,
    profileController.getProfile
);

module.exports = router;