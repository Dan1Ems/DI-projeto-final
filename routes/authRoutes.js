const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/profile",
    authController.requireAuth,
    authController.showProfile
);
router.get("/login", authController.showLogin);
router.get("/register", authController.showRegister);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

module.exports = router;