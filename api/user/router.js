const User = require("../user/model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { restrictAccess, validatePassword } = require("../auth/middleware");
const { validateUser, validateUserExists } = require("./middleware");

const router = express.Router();

router.post("/register", validateUser, validatePassword, async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();

    if (foundUser) {
      return res
        .status(400)
        .json({ message: "The user with the specified email already exists." });
    }

    const newUser = await new User({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 14),
    }).save();

    return res.status(201).json({ newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.Please try again later." });
  }
});

router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong.Please try again later." });
    });
});

router.post("/login", validatePassword, async (req, res) => {
  try {
    const { email } = req.body;

    console.log("req.body", req.body);

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }

    console.log("foundUser", foundUser);

    const token = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.Please try again later." });
  }
});

router.get("/logout", (req, res) => {
  return res.status(200).json({ message: "Logged out successfully." });
});

router.get("/:id", validateUserExists, (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong.Please try again later." });
    });
});

router.put(
  "/:id",
  restrictAccess,
  validateUserExists,
  validateUser,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    User.findByIdAndUpdate(id, changes)
      .exec()
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Something went wrong.Please try again later." });
      });
  }
);

router.delete("/:id", restrictAccess, validateUserExists, (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong.Please try again later." });
    });
});

module.exports = router;
