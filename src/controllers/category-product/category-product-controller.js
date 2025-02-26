const categoryProductService = require("../../services/category-product/category-product-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const getAllCategoryProduct = async (req, res) => {
  try {
    const data = await categoryProductService.getAllCategoryProductService();
    return res
      .status(200)
      .json(successResponse(data, "Category product retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const createCategoryProduct = async (req, res) => {
  try {
    const categoryProductData = req.body;

    const data = await categoryProductService.createCategoryProductService(
      categoryProductData
    );

    return res
      .status(201)
      .json(successResponse(data, "Category project created successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const updateCategoryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryProductData = req.body;

    const data = await categoryProductService.updateCategoryProductService(
      id,
      categoryProductData
    );

    return res
      .status(200)
      .json(successResponse(data, "Category project updated successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const deleteCategoryProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await categoryProductService.deleteCategoryProductService(id);
    return res
      .status(200)
      .json(successResponse(null, "Category product deleted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  getAllCategoryProduct,
  deleteCategoryProduct,
  createCategoryProduct,
  updateCategoryProduct,
};
