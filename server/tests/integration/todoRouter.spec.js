import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { deleteTestUser, tokenInvalid } from '../utils';

const { expect } = chai;

chai.use(chaiHttp);

let token;
let res2;

describe('TodoRouter', () => {
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

  after(async () => {
    await deleteTestUser('jessicajones@alias.com');
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

  describe('Request without a token', () => {
    it('Should return 401 Unauthorized, on hitting a route that has no token.', async () => {
      const res = await chai
        .request(app)
        .get('/api/todos');

      expect(res).to.have.status(401);
    });
  });

  describe('Request with an invalid token', () => {
    it('Should return 401 Unauthorized, for a token of a deleted user', async () => {
      const res = await chai
        .request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${tokenInvalid}`);

      expect(res).to.have.status(401);
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
      expect(res.body).to.include.keys('id', 'title', 'UserId', 'updatedAt', 'createdAt');
    });

    it('Should return 200 when a single todo is fetched', async () => {
      const res = await chai
        .request(app).get(`/api/todos/${res2.body.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body).to.include.keys('id', 'title', 'UserId', 'updatedAt', 'createdAt');
    });

    it('Should return 200 when all todos are fetched', async () => {
      const res = await chai
        .request(app).get('/api/todos/')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
    });

    it('Should return 200 when all todos are fetched with pagination query params', async () => {
      const res = await chai
        .request(app).get('/api/todos/?limit=1&page=1')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
    });

    it('Should return 200 when all todos are fetched with incorrect(negative) page query param', async () => {
      const res = await chai
        .request(app).get('/api/todos/?page=-1')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
    });

    it('Should return 200 when all todos are fetched with incorrect(negative) limit query param', async () => {
      const res = await chai
        .request(app).get('/api/todos/?limit=-1')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.be.a('array');
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

    it('Should return 200 when the title of a todo is updated successfully', async () => {
      const res = await chai
        .request(app).put(`/api/todos/${res2.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'I took Killgrave down' });

      expect(res).to.have.status(200);
      expect(res.body).to.include.keys('id', 'title', 'UserId', 'updatedAt', 'createdAt');
    });

    it('Should return 404 when a todo does not exist', async () => {
      const res = await chai
        .request(app)
        .delete('/api/todos/10000')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(404);
      expect(res.body).to.include.keys('message');
    });
  });

  describe('Todo Items actions', () => {
    it('Should return 201 when a todo item is created successfully', async () => {
      const res3 = await chai
        .request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'I took Killgrave down' });

      const res = await chai
        .request(app)
        .post(`/api/todos/${res3.body.id}/items`)
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'I beat the hell out of Luke Cage' });

      expect(res).to.have.status(201);
      expect(res.body).to.include.keys('id', 'complete', 'content', 'todoId', 'updatedAt', 'createdAt');
    });

    it('Should return 204 when a todo item is deleted successfully', async () => {
      const resCreate = await chai
        .request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'I took Killgrave down' });

      const res3 = await chai
        .request(app)
        .post(`/api/todos/${resCreate.body.id}/items`)
        .set('Authorization', `Bearer ${token}`)
        .send({ content: 'I beat the hell out of Luke Cage' });

      const res = await chai
        .request(app)
        .delete(`/api/todos/${resCreate.body.id}/items/${res3.body.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(204);
    });

    it('Should return 404 when a todo item does not exist', async () => {
      const res = await chai
        .request(app)
        .delete(`/api/todos/${res2.body.id}/items/100000`)
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(404);
      expect(res.body).to.include.keys('message');
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
        .send({ complete: true, content: 'I beat Cage Twice' });

      expect(res).to.have.status(200);
      expect(res.body).to.include.keys('id', 'complete', 'content', 'todoId', 'updatedAt');
    });
  });
});
