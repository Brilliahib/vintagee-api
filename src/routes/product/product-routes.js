const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const productController = require("../../controllers/product/product-controller");
const upload = require("../../middlewares/upload-middleware");

const router = express.Router();

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getDetailProduct);

router.get("/category/:id", productController.getProductByCategory);

router.get("/user/:id", productController.getProductUser);

router.use(authMiddleware);

router.get("/user", productController.getAllProductUser);

router.post(
  "/",
  upload.single("image_url"),
  adminMiddleware,
  productController.createProduct
);

router.put(
  "/:id",
  upload.single("image_url"),
  adminMiddleware,
  productController.updateProduct
);

router.delete("/:id", adminMiddleware, productController.deleteProduct);

module.exports = router;
