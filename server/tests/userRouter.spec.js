const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../app');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp)

describe('Login', () => {
  it('should return authentication failed when a password is wrong', async () => {
    await chai.request(app).post('/auth/signup').send({ username: 'lukecage@alias.com', password: 'stormer'})
    const res = await chai.request(app).post('/auth/login').send({ username: 'lukecage@alias.com', password: 'breaker'})

    expect(res).to.have.status(401)
  })
  it('should return 400 Bad Request when username is missing', async () => {
    const res = await chai.request(app).post('/auth/login').send({ username1: 'lukecage@alias.com', password: 'breaker'})

    expect(res).to.have.status(400)
  })
})
