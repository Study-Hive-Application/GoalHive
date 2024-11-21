const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const USER = require("../models/userModel");

const verifiedUserOnly = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.Token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "Access Denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token." });
  }
};

module.exports = verifiedUserOnly;

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.Token) {
    try {
      token = req.cookies.Token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await USER.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = { protect };
