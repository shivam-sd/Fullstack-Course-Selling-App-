const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and is properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded token contains user ID
    if (!decoded.id) {
      return res.status(401).json({ errors: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Invalid or expired token" });
  }
};

module.exports = {
  userMiddleware,
};
