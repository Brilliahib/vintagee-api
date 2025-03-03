const orderService = require("../../services/order/order-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const getAllOrder = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await orderService.getAllOrderService(id);

    return res
      .status(200)
      .json(successResponse(data, "Order retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getRequestOrder = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await orderService.getRequestOrderService(id);

    return res
      .status(200)
      .json(successResponse(data, "Request order retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getDetailOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await orderService.getDetailOrderService(id);

    return res
      .status(200)
      .json(successResponse(data, "Detail order retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const createOrder = async (req, res) => {
  try {
    const orderValidation = req.body;
    const image = req.file;
    const userId = req.user.id;

    const data = await orderService.createOrderService(
      orderValidation,
      image,
      userId
    );

    return res
      .status(201)
      .json(successResponse(data, "Order created successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await orderService.confirmPaymentOrderService(id);

    return res
      .status(200)
      .json(successResponse(data, "Order confirm accepted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await orderService.deleteOrderService(id);

    return res
      .status(200)
      .json(successResponse(null, "Order deleted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  getAllOrder,
  getDetailOrder,
  createOrder,
  confirmOrder,
  deleteOrder,
  getRequestOrder,
};
