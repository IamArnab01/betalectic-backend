const router = require("express").Router();
const Product = require("../models/product");

router.post("/add", async (req, res) => {
  console.log(req.body);
  const new_product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const product = await new_product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all Products
router.get("/getAll", async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({
      status: 200,
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// get individual Product
router.get("/getAll/:prodId", async (req, res) => {
  try {
    const allProducts = await Product.findById(req.params.prodId);
    res.status(200).send(allProducts);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
