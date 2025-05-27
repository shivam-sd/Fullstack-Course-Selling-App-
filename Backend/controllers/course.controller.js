const CourseModel = require("../models/course.modle.js");
const PurchaseModel = require("../models/purchase.model.js");
const cloudinary = require("cloudinary").v2;
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Course
async function CourseController(req, res) {
  const { title, description, price } = req.body;
  const adminId = req.adminId;

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ errors: "No image uploaded" });
    }

    const image = req.files.image;
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).json({ errors: "Invalid file format. Only PNG or JPG allowed." });
    }

    const upload_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!upload_response || upload_response.error) {
      return res.status(500).json({ errors: "Error uploading file to Cloudinary" });
    }

    const course = await CourseModel.create({
      title,
      description,
      price,
      image: {
        public_id: upload_response.public_id,
        url: upload_response.url,
      },
      createrId: adminId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the course",
      error: err.message,
    });
  }
}

// Update Course
async function CourseUpdate(req, res) {
  const courseId = req.params.courseId;
  const { title, description, price, image } = req.body;
  const adminId = req.adminId;

  try {
    const update = await CourseModel.updateOne(
      { _id: courseId, createrId: adminId },
      { title, description, image, price }
    );

    if (update.modifiedCount === 0) {
      return res.status(404).json({ message: "Course not found or not authorized" });
    }

    return res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error updating course" });
  }
}

// Delete Course
async function CourseDelete(req, res) {
  const courseId = req.params.courseId;
  const adminId = req.adminId;

  try {
    const deletedCourse = await CourseModel.findOneAndDelete({ _id: courseId, createrId: adminId });

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found or not authorized" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting course" });
  }
}

// Get All Courses
async function AllCourses(req, res) {
  try {
    const courses = await CourseModel.find();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ errors: "Error fetching courses" });
  }
}

// Get Course Details
async function CourseDetails(req, res) {
  const courseId = req.params.courseId;

  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }

    return res.status(200).json({ course });
  } catch (error) {
    return res.status(400).json({ errors: "Error fetching course details" });
  }
}

// Buy Course
async function CourseBuy(req, res) {
  const userId = req.userId;
  const courseId = req.params.courseId;

  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }

    const alreadyPurchased = await PurchaseModel.findOne({ userId, courseId });
    if (alreadyPurchased) {
      return res.status(400).json({ errors: "Course already purchased" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    const purchase = await PurchaseModel.create({ userId, courseId });

    return res.status(200).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
      purchase,
    });
  } catch (error) {
    return res.status(500).json({ errors: "Error purchasing course" });
  }
}

// Export all
module.exports = {
  CourseController,
  CourseUpdate,
  CourseDelete,
  AllCourses,
  CourseDetails,
  CourseBuy,
};
