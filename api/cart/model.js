const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  //RELATIONSHIP WITH ANOOTHER COLLECTION(TABLE) 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Products",
  },
});

const Cart = new mongoose.model("Carts", CartSchema);

module.exports = Cart;
