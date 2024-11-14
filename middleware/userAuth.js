const jwt = require("jsonwebtoken");

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
    req.user = decoded.user; // Attach user info from token to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token." });
  }
};

module.exports = verifiedUserOnly;
