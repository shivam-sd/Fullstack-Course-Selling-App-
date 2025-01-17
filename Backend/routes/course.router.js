const express = require("express");
const router = express.Router();

// Import specific handlers from course.controller.js
const { 
  CourseController, 
  CourseUpdate, 
  CourseDelete, 
  AllCourses, 
  CourseDetails, 
  CourseBuy,
} = require("../controllers/course.controller.js");

// Import Middlewares
const { userMiddleware } = require("../middlewares/user.mid.js");
const adminMiddleware = require("../middlewares/admin.mid.js");

// Define routes with the appropriate handler functions
router.post("/create", adminMiddleware, CourseController);                 // Create a new course
router.put("/update/:courseId",adminMiddleware, CourseUpdate);            // Update a specific course
router.delete("/delete/:courseId", adminMiddleware, CourseDelete);         // Delete a specific course
router.get("/allcourses", AllCourses);                   // Get all courses
router.get("/:courseId", CourseDetails);                 // Get details of a specific course

//for courses buy by the user

router.post("/buy/:courseId", userMiddleware ,CourseBuy);

module.exports = router;
