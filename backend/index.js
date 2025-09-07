const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route.js");
const cartRoute = require("./routes/cart.route.js");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// DB connection
async function dbconnection() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Database not connected", error.message);
    process.exit(1);
  }
}
dbconnection();

const port = process.env.PORT || 3000;

// Routes
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
