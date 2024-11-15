const jwt = require("jsonwebtoken");

const accessMiddleware = (req, res, next) => {
  //Check token
  const token = req.cookies.Token;
  //Setting false as Default
  req.isAuthenticated = false;
  if (token) {
    try {
      // Verifying token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // Attach user info from token to request object
      req.isAuthenticated = true;
    } catch (err) {
      res.send("Invalid or expired token.");
    }
  }

  next();
};

module.exports = accessMiddleware;
