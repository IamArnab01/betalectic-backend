const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const config = require("./config");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

app.use(bodyParser.json());
app.use(cors());

app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
