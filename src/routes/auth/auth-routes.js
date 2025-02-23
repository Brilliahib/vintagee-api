const express = require("express");
const authController = require("../../controllers/auth/auth-controller");
const { authMiddleware } = require("../../middlewares/auth-middleware");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.put("/edit", authMiddleware, authController.updateUser);

router.get("/get-auth", authMiddleware, authController.getAuthUser);

module.exports = router;
