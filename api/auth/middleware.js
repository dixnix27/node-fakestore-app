const jwt = require("jsonwebtoken");

const restrictAccess = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized.Please, sign in." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized.Please, sign in." });
      }
      console.log("decoded: ", decoded);
      req.decoded = decoded;
      next();
    });
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(422)
      .json({ message: "Password must have at least 6 characters." });
  }
  next();
};

module.exports = { restrictAccess, validatePassword };
