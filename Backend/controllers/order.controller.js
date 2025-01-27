const orderModel = require("../models/order.model");
const PurchaseModel = require("../models/purchase.model");

const orderData = async(req,res) => {
    const order = req.body;
    try{
        const orderInfo = await orderModel.create(order);
        console.log(orderInfo);
        const userId = orderInfo?.userId;
        const courseId  = orderInfo?.courseId;
        res.status(201).json({message:"Order Details",orderInfo});
        if(orderInfo){
            await PurchaseModel.create({userId , courseId});
        } 
    }catch(error){
        console.log("Error in Order", error);
        res.status(401).json({errors:"Error in order creation"});
    }
}


module.exports = orderData