const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../../app');
const { deleteTestUser } = require('../utils');

chai.use(chaiHttp);

describe('A user', () => {
  before(async () => {
    await chai
      .request(app)
      .post('/auth/signup')
      .send({ username: 'ironman@starkindustries.com', password: 'breaker' });

    const res1 = await chai
      .request(app)
      .post('/auth/login')
      .send({ username: 'ironman@starkindustries.com', password: 'breaker' });

    token = res1.body.token;
    userId = res1.body.user.id;
  });

  after(async () => {
    await deleteTestUser('ironman@starkindustries.com');
  });

  describe('Update password', () => {
    it('Should return 200 Success, on successfully updating the password of a user.', async () => {
      const res = await chai
        .request(app)
        .patch(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ password: '1234567890' });

      expect(res).to.have.status(200);
    });
  });

});
