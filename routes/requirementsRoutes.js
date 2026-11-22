const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "middleware", "authMiddleware"));
const requirementsController = require(path.join(__dirname, "..", "controllers", "requirementsController.js"));

router.get("/",
    requireAuth,
    requirementsController.showRequirements
);

module.exports = router;