const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const checkOwner = require('../../middlewares/checkOwner');
const { Todo } = require('../../models');
const { TodoItem } = require('../../models');
const { deleteTestUser } = require('../utils');
const { User } = require('../../models');

chai.use(sinonChai);

describe('utils', () => {
  before(async () => {
    user = await User.create({ username: 'testuser4@test.com', password: '1234567' });
    todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
    todoItem = await TodoItem.create({ content: 'Watch Season 1', todoId: todo.id });
  });

  after(async () => {
    await deleteTestUser('testuser4@test.com');
  });

  describe('checkOwner', () => {
    it('should return call next if todo is found', async () => {
      const request = {
        user: {
          id: user.id,
        },
        todo,
        todoItem,
        params: {
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner.findTodo(req, res, next);
      expect(next.called).to.be.true;
    });

    it('should return 404 if todo is not found', async () => {
      const request = {
        user: {
          id: user.id,
        },
        todo,
        todoItem,
        params: {
          todoId: 100000,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner.findTodo(req, res, next);
      expect(res.status).to.have.been.calledWith(404);
    });

    it('should return 403 if user is not authorized to access a todo', async () => {
      const request = {
        user: {
          id: 100000,
        },
        todo,
        todoItem,
        params: {
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      await checkOwner.findTodo(req, res, next);
      expect(res.status).to.have.been.calledWith(403);
    });
  });
});
