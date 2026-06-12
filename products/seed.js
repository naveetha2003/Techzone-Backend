require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./products.json");

mongoose.connect(process.env.MONGO_URL);

async function seedData() {
  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log("Products Inserted");
  process.exit();
}

seedData();