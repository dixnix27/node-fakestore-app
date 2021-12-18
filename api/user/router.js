const User = require("../user/model");
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();

    if (foundUser) {
      return res
        .status(400)
        .json({ message: "The user with same email already exist." });
    }

    const newUser = new User({
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

module.exports = router;
