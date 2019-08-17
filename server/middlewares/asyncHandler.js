const asyncHandler = (cb) => async (req, res, next) => {
  try {
    return await cb(req, res, next);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default asyncHandler;
