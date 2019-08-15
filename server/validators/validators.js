const { Joi } = require('celebrate');

const validateTodo = Joi.object().keys({
  title: Joi.string().required(),
});

const validateTodoItem = Joi.object().keys({
  content: Joi.string().required(),
  complete: Joi.boolean().optional(),
});

const validateUser = Joi.object().keys({
  username: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).alphanum().required(),
});

const validateLogin = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validatePassword = Joi.object().keys({
  password: Joi.string().alphanum().min(7).required(),
});

module.exports = {
  validateTodo,
  validateTodoItem,
  validateUser,
  validateLogin,
  validatePassword,
};
