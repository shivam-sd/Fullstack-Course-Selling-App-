const express = require("express");
const router = express.Router();
const { AdminSignup, AdminLogin, AdminLogout } = require("../controllers/admin.controller");

// Correctly define the routes with a leading "/"
router.post("/signup", AdminSignup);
router.post("/login", AdminLogin);
router.get("/logout", AdminLogout);

module.exports = router;
