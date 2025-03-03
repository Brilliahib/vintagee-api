const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const orderController = require("../../controllers/order/order-controller");
const upload = require("../../middlewares/upload-middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", orderController.getAllOrder);

router.get("/request", orderController.getRequestOrder);

router.post(
  "/",
  upload.single("payment_proof_url"),
  orderController.createOrder
);

router.get("/detail/:id", orderController.getDetailOrder);

router.put("/confirm/:id", orderController.confirmOrder);

module.exports = router;
