const { isCelebrate } = require('celebrate');

const joiErrors = (err, req, res, next) => {
  if (!isCelebrate(err)) {
    req.joiError = false;
    return next(err);
  }

  return res.status(400).json({
    status: 400,
    message: 'Bad Request',
    errors: err.joi.details,
  });
};

module.exports = joiErrors;
