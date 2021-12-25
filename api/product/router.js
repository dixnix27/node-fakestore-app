const express = require("express");
const Product = require("./model");
const {validateProduct,validateProductId} = require("./middleware")
const router = express.Router();

router.get("/", (req, res) => {
  Product.find()
    .exec()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    });
});

router.get("/:id",validateProductId, (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .exec()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    });
});

router.post("/",validateProduct, (req, res) => {
  const { title, description, price, category, image, rating } = req.body;

  new Product({ title, description, price, category, image, rating })
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    });
});

router.put("/:id", validateProductId,validateProduct,(req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Product.findByIdAndUpdate(id, changes)
    .exec()
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    });
});

router.delete("/:id",validateProductId, (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .exec()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    });
});
module.exports = router;
