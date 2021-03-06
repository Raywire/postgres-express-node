const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const todosItemsController = require('../../controllers/todoitems');
const { Todo } = require('../../models');
const { TodoItem } = require('../../models');
const { User } = require('../../models');
const { deleteTestUser } = require('../utils');

chai.use(sinonChai);

describe('todoItem.controller', () => {
  before(async () => {
    user = await User.create({ username: 'testuser@test.com', password: '1234567' });
    todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
    todoItem = await TodoItem.create({ content: 'Watch Season 1', todoId: todo.id });
  });

  after(async () => {
    await deleteTestUser('testuser@test.com');
  });

  describe('createTodoItem', () => {
    it('should return the created todo item', async () => {
      const request = {
        user: { id: user.id },
        body: {
          content: 'Hello world item',
        },
        params: {
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosItemsController.createTodoItem(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });
  describe('update', () => {
    it('should return the updated todo item', async () => {
      const request = {
        user: { id: user.id },
        todoItem,
        todo,
        body: {
          title: 'Hello NodeJS item',
        },
        params: {
          todoItemId: todoItem.id,
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosItemsController.update(req, res);
        expect(res.status).to.have.been.calledWith(200);
    });
    it('should return 404', async () => {
      const request = {
        user: { id: user.id },
        todoItem,
        body: {
          title: 'Hello NodeJS item',
        },
        params: {
          todoItemId: 1000000,
          todoId: todo.id,
        },
      };
      const req = mockReq(request);
      const res = mockRes();
      await todosItemsController.update(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});
