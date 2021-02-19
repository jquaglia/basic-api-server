'use strict';

require('@code-fellows/supergoose');
const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


describe('testing server routes', () => {
  it('should pass a 404 on a bad route', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });

  it('should pass a 404 on a bad method', async () => {
    const response = await request.post('/bar');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });

  it('should response with a 200 when hitting GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new food on POST /food', async () => {
    const response = await request.post('/food').send({
      name: 'Pizza',
      type: 'delicious',
    });
    const responseTwo = await request.post('/food').send({
      name: 'Apple',
      type: 'fruit',
    });
    const responseThree = await request.post('/food').send({
      name: 'Lasagna',
      type: 'pasta',
    });

    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('Pizza');
    expect(responseTwo.body.name).toEqual('Apple');
    expect(responseThree.body.name).toEqual('Lasagna');
  });

  it('should get a food by request parameter on GET /food/1', async () => {
    const response = await request.get('/food');
    const test = await request.get(`/food/${response.body[0]._id}`);

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it('should get a food list by request parameter on GET', async () => {
    const response = await request.get('/food');

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Pizza');
    expect(response.body[1].name).toEqual('Apple');
    expect(response.body[2].name).toEqual('Lasagna');
  });

  it('should update an existing food on PUT /food/:id', async () => {
    const response = await request.get('/food/');
    // console.log('PUT', response.body);
    const test = await request.put(`/food/${response.body[0]._id}`).send({
      name: 'Broccoli',
      type: 'vegetable',
    });

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.name).toEqual('Broccoli');
  });

  it('should delete an existing food on DELETE', async () => {
    const response = await request.post('/food').send({
      name: 'Broccoli',
      type: 'vegetable',
    });
    const test = response.body._id;
    const removedFood = await request.delete(`/food/${test}`);

    expect(removedFood.status).toEqual(200);
  });

  // Testing for clothes
  it('should response with a 200 when hitting GET /clothes', async () => {
    const response = await request.get('/clothes');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new clothes on POST /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Pants',
      type: 'jeans',
    });
    const responseTwo = await request.post('/clothes').send({
      name: 'Shirt',
      type: 'silk',
    });
    const responseThree = await request.post('/clothes').send({
      name: 'Sunglasses',
      type: 'ray-bans',
    });

    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('Pants');
    expect(responseTwo.body.name).toEqual('Shirt');
    expect(responseThree.body.name).toEqual('Sunglasses');
  });

  it('should get a clothes by request parameter on GET /clothes/1', async () => {
    const response = await request.get('/clothes');
    const test = await request.get(`/clothes/${response.body[0]._id}`);

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it('should get a clothes list by request parameter on GET', async () => {
    const response = await request.get('/clothes');

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Pants');
    expect(response.body[1].name).toEqual('Shirt');
    expect(response.body[2].name).toEqual('Sunglasses');
  });

  it('should update an existing clothes on PUT /clothes/:id', async () => {
    const response = await request.get('/clothes/');
    // console.log('PUT', response.body);
    const test = await request.put(`/clothes/${response.body[0]._id}`).send({
      name: 'Watch',
      type: 'rolex',
    });

    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.name).toEqual('Watch');
  });

  it('should delete an existing clothes on DELETE', async () => {
    const response = await request.post('/clothes').send({
      name: 'Watch',
      type: 'rolex',
    });
    const test = response.body._id;
    const removedClothes = await request.delete(`/clothes/${test}`);

    expect(removedClothes.status).toEqual(200);
  });

});