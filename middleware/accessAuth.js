const jwt = require("jsonwebtoken");

const accessMiddleware = (req, res, next) => {
  const token = req.cookies.Token;

  req.isAuthenticated = false; // Default False

  try {
    // Verifying token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    req.isAuthenticated = true;
    next();
  } catch (err) {
    return res.render("account", {
      isAuthenticated: req.isAuthenticated,
      message: "Session expired or invalid token. Please log in again.",
    });
  }
};

module.exports = accessMiddleware;
