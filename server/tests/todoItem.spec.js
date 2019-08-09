const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const todosItemsController = require('../controllers/todoitems');
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const User = require('../models').User;

process.env.NODE_ENV = 'test';
chai.use(sinonChai);

before(async () => {
  user = await User.create({ username: 'testuser@test.com', password: "1234567" })
  todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
  todoItem = await TodoItem.create({ content: 'Watch Season 1', todoId: todo.id });
})

after(async () => {
  await User.findByPk(user.id).then((user => {
    if (user) {
      user.destroy();
    }
  }))
})

describe('todoItem.controller', () => {
  describe('createTodoItem', () => {
    it('should return the created todo item', done => {
      const request = {
        user: { id: user.id },
        body: {
          content: 'Hello world item',
        },
        params: {
          todoId: todo.id
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      todosItemsController.createTodoItem(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(201)
        done()
      })
    })
  })
  describe('update', () => {
    it('should return the updated todo item', done => {
      const request = {
        user: { id: user.id },
        todoItem,
        todo,
        body: {
          title: 'Hello NodeJS item',
        },
        params: {
          todoItemId: todoItem.id,
          todoId: todo.id
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      todosItemsController.update(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200)
        done()
      })
    })
    it('should return 404', done => {
      const request = {
        user: { id: user.id },
        todoItem,
        body: {
          title: 'Hello NodeJS item',
        },
        params: {
          todoItemId: 1000000,
          todoId: todo.id
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      todosItemsController.update(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(404)
        done()
      })
    })
  })
})