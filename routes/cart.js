const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🧠 TOKEN CHECK HELPER (optional but clean)
const getUser = async (token) => {
  const decoded = jwt.verify(token, "secretkey123");
  return await User.findById(decoded.id);
};

// 🛒 ADD TO CART
router.post("/add", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const user = await getUser(token);

    user.cart.push(req.body);

    await user.save();

    res.json({ msg: "Added to cart", cart: user.cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🛒 GET CART
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const user = await getUser(token);

    res.json(user.cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;