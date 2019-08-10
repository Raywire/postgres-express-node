const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../app');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Base Route', () => {
  it('Should return 200 OK, on hitting Base Route.', async () => {
    const res = await chai
      .request(app)
      .get('/');

    expect(res).to.have.status(200);
  });

  it('Should return 200 OK, on hitting Base Route with no PORT on NODE_ENV', async () => {
    process.env.PORT = undefined;

    const res = await chai
      .request(app)
      .get('/');

    expect(res).to.have.status(200);
  });
});
