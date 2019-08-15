const response = {
  success: false,
  message: 'Request params must be positive integers',
};

const responseTwo = {
  success: false,
  message: 'URL params must be greater than zero',
};

const checkParams = (req, res, next) => {
  const { todoId, todoItemId } = req.params;

  if (!Number.isInteger(Number(todoId))) {
    return res.status(400).json(response);
  }

  if (todoItemId && !Number.isInteger(Number(todoItemId))) {
    return res.status(400).json(response);
  }

  if (todoId < 1 || todoItemId < 1) {
    return res.status(400).json(responseTwo);
  }
  return next();
};

const checkUserRouteParams = (req, res, next) => {
  const { userId } = req.params;

  if (!Number.isInteger(Number(userId))) {
    return res.status(400).json(response);
  }

  if (userId < 1) {
    return res.status(400).json(responseTwo);
  }
  return next();
};

module.exports = {
  checkParams,
  checkUserRouteParams,
};
