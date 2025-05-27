const orderModel = require("../models/order.model");
const PurchaseModel = require("../models/purchase.model");

const orderData = async (req, res) => {
  const order = req.body;

  try {
    // Create order
    const orderInfo = await orderModel.create(order);
    const userId = orderInfo?.userId;
    const courseId = orderInfo?.courseId;

    // Create purchase record only if order creation was successful
    if (!userId || !courseId) {
      return res.status(400).json({ errors: "Invalid order data" });
    }

    await PurchaseModel.create({ userId, courseId });

    // Send success response
    res.status(201).json({
      message: "Order and purchase recorded successfully",
      orderInfo,
    });

  } catch (error) {
    // console.error("Error in Order:", error);
    res.status(500).json({ errors: "Error in order creation" });
  }
};

module.exports = orderData;
