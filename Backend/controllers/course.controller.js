const PurchaseModel = require("../models/purchase.model.js");
const coursemodel = require("../models/course.modle.js");
const cloudinary = require('cloudinary').v2;

async function CourseController(req, res) {
  const { title, description, price } = req.body;
  const adminId = req.adminId;
  try {
    // Validation for course
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    // File upload validation
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const image = req.files.image;

    // Image format validation
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).json({ errors: "Invalid file format. Only PNG or JPG are allowed" });
    }

    // Cloudinary upload image
    const upload_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!upload_response || upload_response.error) {
      return res.status(400).json({ errors: "Error uploading file to Cloudinary" });
    }

    // Course creation
    const course = await coursemodel.create({
      title: title,
      description: description,
      price: price,
      image: {
        public_id: upload_response.public_id,
        url: upload_response.url,
      },
      createrId:adminId
    });

    return res.status(201).json({
      success: true,
      message: "Course successfully created",
      course: course,
    });
  } catch (err) {
    console.error("Error creating course:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the course",
      error: err.message,
    });
  }
}

async function CourseUpdate(req, res) {
  const courseId = req.params.courseId;
  const { title, description, price, image } = req.body;
  const adminId = req.adminId;

  try {
    const updateCourse = await coursemodel.updateOne(
      { _id: courseId , createrId:adminId },
      { title, description, image, price }
    );

    return res.status(201).json({ message: "Course updated successfully" });

  } catch (error) {
    console.error("Error updating course:", error);
    return res.status(500).json({ error: "Error updating course" });
  }
}

async function CourseDelete(req, res) {
  const courseId = req.params.courseId;
  const adminId = req.adminId;
  try {
    const deletedCourse = await coursemodel.findOneAndDelete({ _id: courseId  , createrId:adminId});

    if (!deletedCourse) {
      return res.status(400).json({ message: "Course not found in database" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });

  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Error deleting course" });
  }
}

async function AllCourses(req, res) {
  try {
    const courses = await coursemodel.find();
    // console.log(courses.length)
    return res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ errors: "Error fetching courses" });
  }
}

async function CourseDetails(req, res) {
  const courseId = req.params.courseId;
  try {
    const courseDetail = await coursemodel.findById(courseId);

    if (!courseDetail) {
      return res.status(404).json({ errors: "Course not found" });
    }

    return res.status(200).json({ courseDetail });

  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.status(400).json({ errors: "Error fetching course details" });
  }
}

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(stripe)

async function CourseBuy(req, res) {
  const userId = req.userId; // यूजर आईडी को `req` से प्राप्त करना
  const courseId = req.params.courseId; // कोर्स आईडी को `req.params` से प्राप्त करना

  try {
    // कोर्स को डेटाबेस में सर्च करना
    const course = await coursemodel.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ errors: "Course Not Found" });
    }

    // चेक करना कि यूजर ने पहले ही इस कोर्स को खरीदा है या नहीं
    const existingPurchase = await PurchaseModel.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ errors: "User already purchased this course" });
    }
    
    const amount = course.price;
    // Payment integration with the help of Strip
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });


    // यदि कोर्स पहले नहीं खरीदा गया है, तो नया खरीदारी रिकॉर्ड बनाएं
    const newPurchase = await PurchaseModel.create({
      userId: userId,
      courseId:courseId
    });

    // सफल खरीदारी का उत्तर भेजें
    return res.status(200).json({ message: "Course purchased successfully" ,
     course, clientSecret:paymentIntent.client_secret , newPurchase });
  } catch (error) {
    // एरर को हैंडल करें और लॉग करें
    console.error("Error in Course Buying", error);
    res.status(500).json({ errors: "Error in course buying" });
  }
}


// Export all functions in an object
module.exports = {
  CourseController,
  CourseUpdate,
  CourseDelete,
  AllCourses,
  CourseDetails,
  CourseBuy,
};
