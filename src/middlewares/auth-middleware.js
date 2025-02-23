const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      error: { message: "Unauthorized: Missing or invalid token format" },
    });
  }

  const tokenWithoutBearer = token.split("Bearer ")[1];

  if (!tokenWithoutBearer) {
    return res
      .status(401)
      .json({ error: { message: "Unauthorized: Missing token value" } });
  }

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    req.user = decodedToken;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: "Unauthorized: Token verification failed",
        details: error.message,
      },
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: { message: "Forbidden: Admin access required" } });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
