const router = require("express").Router();
const Cart = require("../models/cart");
const Product = require("../models/product");

// const isQuantityLessThanOrEqualTo = (quantityA, quantityB) =>
//   quantityA <= quantityB;

// const calculateTotalDiscounts = async () => {
//   let totalDiscount = 0;
//   let totalPrice = 0;

//   // Fetch cart items from the database
//   const cartItems = await Cart.find();

//   for (const cartItem of cartItems) {
//     const product = await Product.findById(cartItem.productId);
//     if (product) {
//       const quantity = cartItem.quantity;
//       totalPrice += product.price * quantity;

//       // Check for applicable promotions
//       const promotion = await this.PromotionModel.findOne({
//         productId: product.id,
//         quantity: (promoQuantity) =>
//           isQuantityLessThanOrEqualTo(promoQuantity, quantity),
//       });

//       if (promotion) {
//         totalDiscount +=
//           product.price * quantity - promotion.discountPrice * quantity;
//       }
//     }
//   }

//   // Check for the additional discount if the total price is over Rs 150
//   if (totalPrice > 150) {
//     totalDiscount += 20;
//   }

//   return totalDiscount;
// };

router.post("/add-items", async (req, res) => {
  try {
    // Check if the product exists
    const product = await Product.findById(req.body.productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Create a new cart item record and save it to the database
    const cartItem = new Cart({
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    await cartItem.save();

    res
      .status(201)
      .json({ message: "Item added to cart and saved successfully", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all cart prods at once
router.get("/get-items", async (req, res) => {
  try {
    const data = await Cart.find();
    res.status(200).json({
      status: 200,
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// get cart with prod id -> specific prod
router.get("/get-items/:prodId", async (req, res) => {
  try {
    const cartWithProdId = await Cart.findById(req.params.prodId);
    res.status(200).send(cartWithProdId);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
