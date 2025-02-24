const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../middlewares/auth-middleware");
const categoryProductController = require("../../controllers/category-product/category-product-controller");

const router = express.Router();

router.get("/", categoryProductController.getAllCategoryProduct);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  categoryProductController.createCategoryProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryProductController.deleteCategoryProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  categoryProductController.updateCategoryProduct
);

module.exports = router;
