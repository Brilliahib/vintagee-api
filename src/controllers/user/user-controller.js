const userService = require("../../services/user/user-service");
const { successResponse, errorResponse } = require("../../utils/meta");

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userService.getUserById(id);

    if (!data) {
      res.status(404).json(errorResponse(null, "User not found"));
    }

    return res
      .status(200)
      .json(successResponse(data, "Detail user retrieved successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message));
  }
};

module.exports = { getDetailUser };
