const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const PurchaseModel = require("../models/purchase.model.js");
const coursemodel = require("../models/course.modle.js");

// User Signup
const signup = async (req, res) => {
  // Validate all fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hash,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(201).json({
      message: "Signup Successful",
      newUser,
      token,
    });

  } catch (error) {
    res.status(500).json({ errors: "Error in Signup" });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      message: "User successfully logged in",
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({ errors: "Internal server error" });
  }
};

// User Logout
const logout = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in logout" });
  }
};

// Get All Purchased Courses for User
const allPurchasedCourses = async (req, res) => {
  const userId = req.userId;

  try {
    const purchasedCourses = await PurchaseModel.find({ userId });

    const purchasedCourseIds = purchasedCourses.map((p) => p.courseId);

    const courseData = await coursemodel.find({
      _id: { $in: purchasedCourseIds },
    });

    res.status(200).json({ purchasedCourses, courseData });

  } catch (error) {
    res.status(500).json({ errors: "Error fetching purchased courses" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  allPurchasedCourses,
};
