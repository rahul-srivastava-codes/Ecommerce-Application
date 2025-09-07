const express = require("express");
const router = express.Router();
const Cart = require("../Models/cartmodel");
const authMiddleware = require("../middleware/authMiddleware");

// ----------------- Get cart -----------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/add", authMiddleware, async (req, res) => {
  const { productId, title, price, image } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, title, price, image });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- Remove item -----------------
router.post("/remove", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
