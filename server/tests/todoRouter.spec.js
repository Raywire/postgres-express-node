const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../../app');

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

before(async () => {
  await chai
    .request(app)
    .post('/auth/signup')
    .send({ username: 'jessicajones@alias.com', password: 'breaker' });

  const res1 = await chai
    .request(app)
    .post('/auth/login')
    .send({ username: 'jessicajones@alias.com', password: 'breaker' });

  token = res1.body.token;

  res2 = await chai
    .request(app)
    .post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ title: 'I took Killgrave down' });
});

describe('Unallowed methods', () => {
  it('Should return 405 Method Not Allowed, on hitting a method that is not allowed.', async () => {
    const res = await chai
      .request(app)
      .patch('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res).to.have.status(405);
  });
});

describe('Todo actions', () => {
  it('Should return 201 when a todo is created successfully', async () => {
    const res = await chai
      .request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'I took Killgrave down' });

    expect(res).to.have.status(201);
  });
  it('Should return 204 when a todo is deleted successfully', async () => {
    const resDelete = await chai
      .request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'I took Killgrave down' });

    const res = await chai
      .request(app)
      .delete(`/api/todos/${resDelete.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(204);
  });
  it('Should return 200 when a todo is updated successfully', async () => {
    const res = await chai
      .request(app).put(`/api/todos/${res2.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'I took Killgrave down' });

    expect(res).to.have.status(200);
  });
});

describe('Todo Items actions', () => {
  it('Should return 201 when a todo item is created successfully', async () => {
    const res2 = await chai
      .request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'I took Killgrave down' });

    const res = await chai
      .request(app)
      .post(`/api/todos/${res2.body.id}/items`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'I beat the hell out of Luke Cage' });

    expect(res).to.have.status(201);
  });
  it('Should return 204 when a todo item is deleted successfully', async () => {
    const res2 = await chai
      .request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'I took Killgrave down' });

    const res3 = await chai
      .request(app)
      .post(`/api/todos/${res2.body.id}/items`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'I beat the hell out of Luke Cage' });

    const res = await chai
      .request(app)
      .delete(`/api/todos/${res2.body.id}/items/${res3.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(204);
  });
  it('Should return 404 when a todo item does not exist', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/todos/${res2.body.id}/items/100000`)
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(404);
  });
  it('Should return 200 when a todo item is updated successfully', async () => {
    const res3 = await chai
      .request(app)
      .post(`/api/todos/${res2.body.id}/items`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'I beat the hell out of Luke Cage' });

    const res = await chai
      .request(app)
      .put(`/api/todos/${res2.body.id}/items/${res3.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'I beat Cage Twice' });

    expect(res).to.have.status(200);
  });
});
