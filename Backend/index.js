const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const ConnectToDB = require("./db/connectDB");
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary').v2;
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 4000;
const CourseRouter = require("./routes/course.router");
const UserRouter = require("./routes/user.router");
const AdminRouter = require("./routes/admin.route");
const orderRouter = require("./routes/order.route");

ConnectToDB();


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

    // origin:process.env.FROUNTED_URL,
    // methods:["GET","POST","DELETE"],
    // allowedHeaders:["Content-Type" , "Authorization"]

app.get("/", (req,res) => {
    res.send("Hello");
});

app.use("/courses" , CourseRouter);
app.use("/users" , UserRouter);
app.use("/admin",AdminRouter);
app.use("/order",orderRouter);

//cloudnary confugation code
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

app.listen(port , () => {
    console.log(`server started on port ${port}`);
});