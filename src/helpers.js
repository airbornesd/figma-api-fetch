export const getIds = (data) => {
  return data.map((item) => item.replace(':', '-'));
};

export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || 'success',
    data,
    errors,
  });
};

export const extractIds = (data, x) => {
  const result = data
    .filter((item) =>
      item.children.some((child) => child.absoluteBoundingBox.width === 32)
    )
    .map((item) => {
      return item.children.find(
        (child) => child.absoluteBoundingBox.width === 32
      ).id;
    });

  return getIds(result);
};
