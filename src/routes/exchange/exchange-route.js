const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const exchangeController = require("../../controllers/exchange/exchange-controller");
const upload = require("../../middlewares/upload-middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", exchangeController.getAllExchange);

router.post(
  "/",
  upload.single("image_url_product"),
  exchangeController.createExchange
);

router.get("/request", exchangeController.getAllRequestExchange);

router.get("/pending", exchangeController.getAllRequestPendingExchange);

router.get("/detail/:id", exchangeController.getDetailExchange);

router.put("/confirm/:id", exchangeController.confirmExchange);

module.exports = router;
