const path = require("path");
const express = require("express");
const router = express.Router();

const requireAuth = require(path.join(__dirname, "..", "..", "middleware", "authMiddleware.js"));
const notesController = require(path.join(__dirname, "..", "..", "controllers", "notesController.js"));

router.get("/",
    requireAuth,
    notesController.getNotes
)
router.get("/others",
    requireAuth,
    notesController.getOtherNotes
);
router.get("/mynotes",
    requireAuth,
    notesController.getMyNotes
);
router.get("/:id",
    requireAuth,
    notesController.getNote
);

router.post("/",
    requireAuth,
    notesController.createNote
);

router.put("/:id",
    requireAuth,
    notesController.updateNote
);

router.delete("/:id",
    requireAuth,
    notesController.deleteNote
);

module.exports = router;