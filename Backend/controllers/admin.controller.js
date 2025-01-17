const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const AdminSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const ExistingAdmin = await AdminModel.findOne({ email: email });
    if (ExistingAdmin) {
      return res.status(404).json({ message: "Admin allready Exist." });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      const newAdmin = await AdminModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      });

      const token = jwt.sign({ email: email }, process.env.ADMIN_JWT_SECRET);
      res.cookie("Adminjwt", token);

      return res
        .status(201)
        .json({ message: "Admin Successfully Created", newAdmin });
    });
  } catch (error) {
    console.log("Error in Signup", error);
    res.status(500).json({ errors: "Error in Admin signup" });
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ errors: "Invalid Credentials" });
    }

    // Check if the password matches
    const isPassword = await bcrypt.compare(password, admin.password); // Add `await` for bcrypt.compare
    if (!isPassword) {
      return res.status(404).json({ errors: "Password or Email Incorrect" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "24h",
    });

    // Cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Corrected `expires` (not `expiresIn`)
      httpOnly: true, // Prevent access by JavaScript
      secure: process.env.NODE_ENV === "production", // Enable for HTTPS only in production
      sameSite: "Strict", // Protect against CSRF attacks
    };

    // Set the cookie
    res.cookie("Adminjwt", token, cookieOptions);

    // Respond with success
    res.status(200).json({ message: "Admin Successfully Logged In" , admin , token });
  } catch (error) {
    console.error("Error in Login", error);
    res.status(500).json({ errors: "Error in Login" });
  }
};

const AdminLogout =  (req,res) => {
    try{
        if(!req.headers.cookie){
            return res.status(200).json({message:"First login"});
        }
        res.clearCookie("Adminjwt");
        res.status(200).json({message:"Admin Successfully Logout"});
    }catch(error){
        console.log("Error In logout" , error);
        res.status(500).json({errors:"Error in Logout"});
    }
};



module.exports = {
  AdminSignup,
  AdminLogin,
  AdminLogout,
};
