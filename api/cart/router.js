const express = require("express");
const Cart = require("./model")

const router = express.Router();


router.get("/" , (req,res)=>{
    Cart.find()
    .populate("user","firstname lastname -_id")
    .populate("products","-_id -__v")
    .exec()
    .then((carts)=>{
        res.status(200).json(carts)
    })
    .catch((err)=>{
        res.status(500).json({mess:err});
    });
});

router.post("/user/:id", (req, res) => {
    const { id } = req.params;
    const { products } = req.body;
    new Cart({ user: id, products })
      .save()
      .then((cart) => {
        res.status(201).json(cart);
      })
      .catch((err) => {
        res.status(500).json({ mess: err });
      });
});

module.exports = router;