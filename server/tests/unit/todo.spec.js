const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const todosController = require('../../controllers/todos');
const { Todo } = require('../../models');
const { User } = require('../../models');
const { deleteTestUser } = require('../utils');

chai.use(sinonChai);

describe('todo.controller', () => {
  before(async () => {
    user = await User.create({ username: 'testuser2@test.com', password: '1234567' });
    todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
  });

  after(async () => {
    await deleteTestUser('testuser2@test.com');
  });

  describe('retrieve', () => {
    it('should return a single todo', (done) => {
      const request = {
        user: { id: user.id },
        todo,
      };
      const req = mockReq(request);
      const res = mockRes();
      todosController.retrieve(req, res);
      expect(res.status).to.have.been.calledWith(200);
      done();
    });
  });
  describe('list', () => {
    it('should return all todos', (done) => {
      const request = {
        user: { id: user.id },
        todo,
      };
      const req = mockReq(request);
      const res = mockRes();
      todosController.list(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200);
        done();
      });
    });
  });
  describe('createTodo', () => {
    it('should return the created todo', (done) => {
      const request = {
        user: { id: user.id },
        body: {
          title: 'Hello world',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      todosController.createTodo(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(201);
        done();
      });
    });
  });
  describe('update', () => {
    it('should return the updated todo', (done) => {
      const request = {
        user: { id: user.id },
        todo,
        body: {
          title: 'Hello NodeJS',
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      todosController.update(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200);
        done();
      });
    });
  });
});
