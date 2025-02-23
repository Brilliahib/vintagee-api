const successResponse = (
  data = {},
  message = "Retrieved successfully",
  pagination = null
) => {
  const response = {
    meta: {
      status: "success",
      message: message,
    },
    data: data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

const errorResponse = (message = "Internal server error") => {
  return {
    meta: {
      status: "error",
      message: message,
    },
  };
};

module.exports = { successResponse, errorResponse };
