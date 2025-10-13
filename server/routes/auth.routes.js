const express = require("express");
const { body } = require("express-validator");
// const { body, validationResult } = require("express-validator");
const {
    handleRegister,
    handleLogin,
    currentUser,
    logout,
} = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

// initialize router
const router = express.Router();

// Base URL: api/auth
router.get("/", (req, res) => {
    res.status(200).json({ message: "Auth routes are working" });
});

// Register
router.post(
    "/register",
    [
        body("name")
            .trim()
            .isLength({ min: 2 })
            .withMessage("Name must be at least 2 characters"),
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    handleRegister
);

// Login
router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please provide a valid email"),
        body("password").exists().withMessage("Password is required"),
    ],
    handleLogin
);

// Get current user
router.get("/me", auth, currentUser);

module.exports = router;
