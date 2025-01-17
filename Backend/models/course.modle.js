const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createrId:{
    type:mongoose.Types.ObjectId,
    ref:"Users"
  }
});

const coursemodle = mongoose.model("Courses", CourseSchema);
module.exports = coursemodle;
