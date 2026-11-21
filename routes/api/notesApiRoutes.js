const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "..", "middleware", "authMiddleware.js"));
const notesController = require(path.join(__dirname, "..", "..", "controllers", "notesController.js"));

router.get("/",
    requireAuth,
    notesController.getNotes
)
router.get("/home",
    requireAuth,
    notesController.getOtherNotes
);
router.get("/notes",
    requireAuth,
    notesController.getMyNotes
);
router.get("/:id",
    requireAuth,
    notesController.getNote
);

module.exports = router;