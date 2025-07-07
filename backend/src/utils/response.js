// Success response helper
export const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

// Error response helper
export const errorResponse = (res, message = "Error occurred", statusCode = 500, error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (error && process.env.NODE_ENV === "development") {
    response.error = error;
  }

  return res.status(statusCode).json(response);
};

// Pagination helper
export const paginateResponse = (res, data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return res.json({
    success: true,
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage
    },
    timestamp: new Date().toISOString()
  });
};

// Validation error response
export const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors,
    timestamp: new Date().toISOString()
  });
}; 