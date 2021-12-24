const User = require("../user/model");

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email) {
    return res.status(400).json({ message: "Missing required field." });
  }
  next();
};

const validateUserExists = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      req.user = user;
      next();
    });
};

module.exports = { validateUser, validateUserExists };
