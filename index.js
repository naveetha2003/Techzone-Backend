require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Check .env value
console.log("MONGO_URL =", process.env.MONGO_URL);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// ================= ROUTES =================

// Product Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const authRoutes = require("./routes/auth");

app.use("/api/auth",authRoutes);

const cartRoutes = require("./routes/cart");

app.use("/api/cart", cartRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Tech Zone Backend Running");
});

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});