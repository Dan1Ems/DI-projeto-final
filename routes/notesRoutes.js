const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "middleware", "authMiddleware"));
const notesController = require(path.join(__dirname, "..", "controllers", "notesController.js"));

router.get("/",
    requireAuth,
    notesController.showNotes
);
router.get("/show/:id",
    requireAuth,
    notesController.showNote
);

router.post("/create",
    requireAuth,
    notesController.createNote
);

module.exports = router;