const express = require("express");
const router = express.Router();
const Cart = require("../Models/cartmodel");
const authMiddleware = require("../middleware/authMiddleware");
const instance = require("../utils/instance");

// ✅ Get Cart
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/add", async (req, res) => {
  const { id } = req.query;

  const response = await instance.get(`/products/${id}`);

  return res.status(200).json({
    success: true,
    product: response.data,
  });
});

// ✅ Remove Item
router.post("/remove", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId.toString()
    );

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error in /cart/remove:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
