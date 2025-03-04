const productService = require("../../services/product/product-service");
const userService = require("../../services/user/user-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const getAllProduct = async (req, res) => {
  try {
    const data = await productService.getAllProductService();
    return res
      .status(200)
      .json(successResponse(data, "Product retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getAllProductUser = async (req, res) => {
  const { id } = req.user.id;
  try {
    const data = await productService.getAllProductUserService(id);
    return res
      .status(200)
      .json(successResponse(data, "Product user retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getDetailProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productService.getDetailProductService(id);

    if (!data) {
      return res.status(404).json(errorResponse(null, "Product not found"));
    }

    return res
      .status(200)
      .json(successResponse(data, "Product detail retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const createProduct = async (req, res) => {
  try {
    const productValidation = req.body;

    const image = req.file;

    const userId = req.user.id;

    const data = await productService.createProductService(
      productValidation,
      image,
      userId
    );

    return res
      .status(201)
      .json(successResponse(data, "Product created succesfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productValidation = req.body;
    const image = req.file;

    const data = await productService.updateProductService(
      productValidation,
      id,
      image
    );

    if (!data) {
      return res.status(404).json(errorResponse(null, "Product not found"));
    }

    return res
      .status(200)
      .json(successResponse(data, "Product updated succesfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await productService.deleteProductService(id);

    if (!data) {
      return res.status(404).json(errorResponse(null, "Product not found"));
    }
    return res
      .status(200)
      .json(successResponse(null, "Product deleted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productService.getProductByCategoryService(id);

    if (!data) {
      return res.status(404).json(errorResponse(null, "Product not found"));
    }

    return res
      .status(200)
      .json(
        successResponse(data, "Product by category retrieved successfully")
      );
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getProductUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getProductUser(id);

    if (!data) {
      return res.status(404).json(errorResponse(null, "Product not found"));
    }

    return res
      .status(200)
      .json(successResponse(data, "Product user retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  getAllProduct,
  getDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductUser,
  getAllProductUser,
};
