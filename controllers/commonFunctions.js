const jwt = require("jsonwebtoken");

// Function for JWT and Cookies
const jwtAndCookies = (res, email) => {
  const accessToken = jwt.sign(
    {
      user: {
        email: email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2d" }
  );
  //Creating Cookie
  res.cookie("Token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
  });
  res.redirect("/dashboard");
};

module.exports = { jwtAndCookies };
