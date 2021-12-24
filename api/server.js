require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./user/router");
const productRouter = require("./product/router");

const server = express();

server.use(express.json()); ///body parser
server.use("/api/users", userRouter);
server.use("/api/products", productRouter);

// DB CONNECT
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.PASSWORD}@stepit.6cdla.mongodb.net/Store?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

server.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to Store App!!</h1>");
});

module.exports = server;
