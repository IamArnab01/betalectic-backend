const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartItemSchema);
