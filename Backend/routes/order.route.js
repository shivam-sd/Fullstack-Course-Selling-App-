const express = require("express");
const orderData = require("../controllers/order.controller");
const { userMiddleware } = require("../middlewares/user.mid");
const router = express.Router();

router.post("/", userMiddleware ,orderData);

module.exports = router