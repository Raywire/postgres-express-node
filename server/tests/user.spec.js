const chai = require("chai");
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const usersController = require('../controllers/users');

process.env.NODE_ENV = 'test';
chai.use(sinonChai);

describe('user.controller', () => {
  describe('signup', () => {
    it('should return the created user', done => {
      const request = {
        body: {
          username: 'testuser3@test.com',
          password: '12345678'
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      usersController.signup(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(201)
        done()
      })
    })
    it('should return 400 error when a user already exists', done => {
      const request = {
        body: {
          username: 'testuser3@test.com',
          password: '12345678'
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      usersController.signup(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(400)
        done()
      })
    })
  })
  describe('login', () => {
    it('should return authentication failed when a username is not found', done => {
      const request = {
        body: {
          username: 'testusernotfound@test.com',
          password: '12345678'
        }
      }
      const req = mockReq(request)
      const res = mockRes()
      usersController.login(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(401)
        done()
      })
    })
  })
})