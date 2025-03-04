const exchangeService = require("../../services/exchange/exchange-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const getAllExchange = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await exchangeService.getAllExchangeService(id);
    return res
      .status(200)
      .json(successResponse(data, "Exchange retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getAllRequestExchange = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await exchangeService.getAllRequestExchangeService(id);
    return res
      .status(200)
      .json(successResponse(data, "Exchange retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getAllRequestPendingExchange = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await exchangeService.getAllRequestPendingExchangeService(id);
    return res
      .status(200)
      .json(successResponse(data, "Exchange pending retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const getDetailExchange = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await exchangeService.getDetailExchangeService(id);

    return res
      .status(200)
      .json(successResponse(data, "Detail exchange retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const confirmExchange = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await exchangeService.confirmExchangeService(id);

    return res
      .status(200)
      .json(successResponse(data, "Exchange confirm accepted successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

const createExchange = async (req, res) => {
  try {
    const exchangeValidation = req.body;

    const image = req.file;

    const userId = req.user.id;

    const data = await exchangeService.createExchangeService(
      exchangeValidation,
      image,
      userId
    );

    return res
      .status(201)
      .json(successResponse(data, "Exchange created successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = {
  getAllExchange,
  getDetailExchange,
  createExchange,
  getAllRequestExchange,
  confirmExchange,
  getAllRequestPendingExchange,
};
