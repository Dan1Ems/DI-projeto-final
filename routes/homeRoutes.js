const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "middleware", "authMiddleware"));
const homeController = require(path.join(__dirname, "..", "controllers", "homeController.js"));

router.get("/",
    requireAuth,
    homeController.showHome
);

module.exports = router;