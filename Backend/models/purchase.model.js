const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"Users"
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Courses"
    },
});

const PurchaseModel = mongoose.model("Purchase" , purchaseSchema);

module.exports = PurchaseModel