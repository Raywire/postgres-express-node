const { expect } = require('chai');
const { Joi } = require('celebrate');
const validator = require('../../validators/validators');

describe('validators', () => {
  describe('todosRouter', () => {
    describe('validate todo', () => {
      it('should return title required', () => {
        const result = Joi.validate({}, validator.validateTodo);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"title" is required');
      });
    });
    describe('validate todo item', () => {
      it('should return content required', () => {
        const result = Joi.validate({}, validator.validateTodoItem);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"content" is required');
      });
    });
  });

  describe('userRouter', () => {
    describe('validate user sign up', () => {
      it('should return username is required', () => {
        const result = Joi.validate({}, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"username" is required');
      });
      it('should return username must be a valid email is required', () => {
        const result = Joi.validate({ username: 'Jessica Jones' }, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"username" must be a valid email');
      });
      it('should return password is required', () => {
        const result = Joi.validate({ username: 'jessicajones@alias.com' }, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"password" is required');
      });
      it('should return an error if password is less than 7 characters', () => {
        const result = Joi.validate({ username: 'jessicajones@alias.com', password: '12' }, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"password" length must be at least 7 characters long');
      });
    });
    describe('validate user login', () => {
      it('should return username is required', () => {
        const result = Joi.validate({}, validator.validateLogin);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"username" is required');
      });
      it('should return username must be a valid email is required', () => {
        const result = Joi.validate({ username: 'Jessica Jones' }, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"username" must be a valid email');
      });
      it('should return password is required', () => {
        const result = Joi.validate({ username: 'jessicajones@alias.com' }, validator.validateUser);
        expect(result.error.details.length).to.equal(1);
        expect(result.error.details[0].message).to.equal('"password" is required');
      });
    });
  });
});
