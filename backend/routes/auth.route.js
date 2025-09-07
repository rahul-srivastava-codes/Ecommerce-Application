const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ----------------- Signup -----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, phonenumber, email, password, role } = req.body;

    if (!name || !phonenumber || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });

    const existingPhone = await User.findOne({ phonenumber });
    if (existingPhone)
      return res
        .status(400)
        .json({ message: "Phone number already exists", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      phonenumber,
      email,
      password: hashedPassword,
      role,
    });

    res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// ----------------- Login -----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({ message: "Login successful", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// ----------------- Logout -----------------
router.post("/logout", (req, res) => {
  res
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logout successful", success: true });
});

module.exports = router;
