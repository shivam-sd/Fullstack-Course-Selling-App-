const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {signup,login,logout ,allPurchasedCourses} = require("../controllers/user.controller.js");
const { userMiddleware } = require("../middlewares/user.mid.js");

router.post("/signup" , [
    body("firstname").isLength({min:3}).withMessage("FirstName must be 3 char long"),
    body("lastname").isLength({min:3}).withMessage("LastName Must Be Atleast 3 char long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password Must Be Atleast 8 char long")
] , signup);

router.post("/login",login);
router.get("/logout",logout);
router.get("/purchased" , userMiddleware ,allPurchasedCourses);


module.exports = router