const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const todosController = require('../controllers/todos');
const Todo = require('../models').Todo;
const User = require('../models').User;

process.env.NODE_ENV = 'test';
chai.use(sinonChai);

before(async () => {
  user = await User.create({ username: 'testuser2@test.com', password: "1234567" });
  todo = await Todo.create({ title: 'Watch Jessica Jones', UserId: user.id });
})

after(async () => {
  await User.findByPk(user.id).then((user => {
    if (user) {
      user.destroy();
    }
  }))
})

describe('todo.controller', () => {
  describe('retrieve', () => {
    it('should return a single todo', done => {
      const request = {
        user: { id: user.id },
        todo,
      }
      const req = mockReq(request)
      const res = mockRes()
      todosController.retrieve(req, res)
      expect(res.status).to.have.been.calledWith(200)
      done()
    })
  })
  describe('list', () => {
    it('should return all todos', done => {
      const request = {
        user: { id: user.id },
        todo,
      }
      const req = mockReq(request)
      const res = mockRes()
      todosController.list(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200)
        done()
      })
    })
  })
  describe('createTodo', () => {
    it('should return the created todo', done => {
      const request = {
        user: { id: user.id },
        body: {
          title: 'Hello world',
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      todosController.createTodo(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(201)
        done()
      })
    })
  })
  describe('update', () => {
    it('should return the updated todo', done => {
      const request = {
        user: { id: user.id },
        todo,
        body: {
          title: 'Hello NodeJS',
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      todosController.update(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(200)
        done()
      })
    })
  })
})