const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(StatusCodes.BAD_REQUEST).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
};

module.exports = errorHandler;
