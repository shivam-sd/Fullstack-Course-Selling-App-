const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    
    // Ensure decoded object has an ID
    if (!decoded.id) {
      return res.status(401).json({ errors: "Invalid token payload" });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ errors: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
