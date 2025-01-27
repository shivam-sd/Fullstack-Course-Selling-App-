const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const PurchaseModel = require("../models/purchase.model.js");
const coursemodle = require("../models/course.modle.js");

const signup = async (req, res) => {
  //validate all the field
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ errors: "User allready esists" });
    }

    // secure password
    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = await UserModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      });

      // genrate token user register time
      const token = jwt.sign({email:email} , process.env.JWT_SECRET);
      res.cookie("token" , token);
      return res.status(201).json({ message: "Signup Successddd", newUser , token});
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in Signup" });
    console.log("Error in Signup", error);
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(403).json({ errors: "Invalid Credentials" });
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({ errors: "Invalid Credentials" });
      }
  
      // Generate token with the help of JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const cookieOptions = {
        expiresIn : new Date(Date.now() + 24*60 *60 * 1000), // 1 day
        httpOnly:true, // can not access js directly
        secure: process.env.NODE_ENV === "production", // true for https only
        sameSite:"Strict" // CSRF attacks
      }
  
      // Set the token in cookies (httpOnly for security)
      res.cookie("token", token , cookieOptions);
  
      // Respond with success message
      return res.status(200).json({ message: "User Successfully Logged In" , user , token});
    } catch (error) {
      console.error("Error in Login:", error);
      return res.status(500).json({ errors: "Internal Server Error" });
    }
  };
  

const logout = async (req,res) => {
    try{
        // res.clearCookie("user");
        res.clearCookie('token', { path: '/' })
        res.status(200).json({message:"Logged out successfully"});
    }catch(error){
        res.status(500).json({error:"Error in Logout"});
        console.log("Error in Logout", error);
    }
}


const allPurchasedCourses = async (req,res) => {
  const userId = req.userId;
  try{
    const purchasedCourses = await PurchaseModel.find({userId});

    let purchasedCoursesId = [];

    for(let i=0; i<purchasedCourses.length; i++){
      purchasedCoursesId.push(purchasedCourses[i].courseId);
    }
      const courseData = await coursemodle.find({
        _id: {$in: purchasedCoursesId},
      });
    res.status(200).json({purchasedCourses , courseData});
  }catch(error){
    console.log("Error in Purchased" , error);
    res.status(500).json({errors:"error in purchased"});
  }
}
 
module.exports = {
  signup,
  login,
  logout,
  allPurchasedCourses
};
