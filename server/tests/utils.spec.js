const chai = require('chai');

const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const checkOwner = require('../utils/checkOwner');
const { Todo } = require('../models');
const { TodoItem } = require('../models');
const { User } = require('../models');

process.env.NODE_ENV = 'test';
chai.use(sinonChai);

before(async () => {
  user = await User.create({ username: 'testuser4@test.com', password: '1234567' });
  todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
  todoItem = await TodoItem.create({ content: 'Watch Season 1', todoId: todo.id });
});

after(async () => {
  await User.findByPk(user.id).then(((user) => {
    if (user) {
      user.destroy();
    }
  }));
});

describe('utils', () => {
  describe('checkOwner', () => {
    it('should return call next if todo is found', (done) => {
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
      checkOwner.findTodo(req, res, next).then(() => {
        expect(next.called).to.be.true;
        done();
      });
    });
    it('should return 404 if todo is not found', (done) => {
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
      checkOwner.findTodo(req, res, next).then(() => {
        expect(res.status).to.have.been.calledWith(404);
        done();
      });
    });
    it('should return 403 if user is not authorized to access a todo', (done) => {
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
      checkOwner.findTodo(req, res, next).then(() => {
        expect(res.status).to.have.been.calledWith(403);
        done();
      });
    });
  });
});
