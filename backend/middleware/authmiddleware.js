const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token; // from cookie
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.id; // store userId for cart routes
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
