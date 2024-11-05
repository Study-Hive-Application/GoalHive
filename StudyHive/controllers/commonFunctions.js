const jwt = require("jsonwebtoken");

// Function for JWT and Cookies
const jwtAndCookies = (res, id, name, email) => {
  const accessToken = jwt.sign(
    {
      user: {
        id: id,
        name: name,
        email: email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "20m" }
  );
  //Creating Cookie
  res.cookie("Token", accessToken, {
    httpOnly: true,
    secure: "production",
    sameSite: "strict",
    maxAge: 5 * 60 * 60 * 1000, // 5 hours in milliseconds
  });
  res.redirect("/dashboard");
};

module.exports = { jwtAndCookies };
