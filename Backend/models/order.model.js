const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
amount:Number,
courseId: String,
email:String,
paymentId:String,
status:String,
userId:String
});

const orderModel = mongoose.model("order",orderSchema);

module.exports = orderModel