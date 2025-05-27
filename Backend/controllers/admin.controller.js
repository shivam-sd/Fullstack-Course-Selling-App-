const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Signup
const AdminSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists." });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ errors: "Error hashing password" });
      }

      const newAdmin = await AdminModel.create({
        firstname,
        lastname,
        email,
        password: hash,
      });

      const token = jwt.sign({ id: newAdmin._id }, process.env.ADMIN_JWT_SECRET, {
        expiresIn: "24h",
      });

      // Set cookie
      res.cookie("AdminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      return res.status(201).json({
        message: "Admin successfully created",
        admin: newAdmin,
        token,
      });
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in Admin signup" });
  }
};

// Admin Login
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("AdminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Admin successfully logged in",
      admin,
      token,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in login" });
  }
};

// Admin Logout
const AdminLogout = (req, res) => {
  try {
    if (!req.cookies?.AdminToken && !req.headers.cookie?.includes("AdminToken")) {
      return res.status(200).json({ message: "Already logged out or not logged in" });
    }

    res.clearCookie("AdminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Admin successfully logged out" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
  }
};

module.exports = {
  AdminSignup,
  AdminLogin,
  AdminLogout,
};
