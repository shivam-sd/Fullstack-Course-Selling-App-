const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ConnectToDB = require("./db/connectDB");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;

// Route Imports
const CourseRouter = require("./routes/course.router");
const UserRouter = require("./routes/user.router");
const AdminRouter = require("./routes/admin.route");
const OrderRouter = require("./routes/order.route");

// Connect to Database
ConnectToDB();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Middlewares
app.use(cors({
  origin: process.env.FROUNTED_URL,
  credentials: true,
}));
// console.log("CORS enabled for:", process.env.FROUNTED_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

// API Routes
app.use("/courses", CourseRouter);
app.use("/users", UserRouter);
app.use("/admin", AdminRouter);
app.use("/order", OrderRouter);

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
