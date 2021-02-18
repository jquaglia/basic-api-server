'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


describe('Server tests', () => {
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

  it('should be able to create a `food` on POST /food', async () => {
    const response = await request.post('/food').send({
      name: 'Steak',
      type: 'meat',
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
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('Steak');
    expect(responseTwo.body.data.name).toEqual('Apple');
    expect(responseThree.body.data.name).toEqual('Lasagna');
  });

  it('should get a food by request parameter on GET /food/1', async () => {
    const response = await request.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  it('should get a food list by request parameter on GET', async () => {
    const response = await request.get('/food');

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].data).toEqual({ name: 'Steak', type: 'meat' });
    expect(response.body[1].data).toEqual({ name: 'Apple', type: 'fruit' });
    expect(response.body[2].data).toEqual({ name: 'Lasagna', type: 'pasta' });
  });

  it('should update an existing food on PUT /food/:id', async () => {
    const response = await request.put('/food/1').send({
      name: 'Broccoli',
      type: 'vegetable',
    });

    console.log('PUT', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('Broccoli');
  });

  it('should delete an existing food on DELETE', async () => {
    const response = await request.delete('/food/1');

    expect(response.status).toEqual(204);
  });

  // Clothes Tests
  it('should be able to create a `clothes` on POST /clothes', async () => {
    const response = await request.post('/clothes').send({
      name: 'Shirt',
      type: 'silk',
    });
    const responseTwo = await request.post('/clothes').send({
      name: 'Pants',
      type: 'jeans',
    });
    const responseThree = await request.post('/clothes').send({
      name: 'Sunglasses',
      type: 'ray-bans',
    });

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('Shirt');
    expect(responseTwo.body.data.name).toEqual('Pants');
    expect(responseThree.body.data.name).toEqual('Sunglasses');
  });

  it('should get a clothes by request parameter on GET /clothes/1', async () => {
    const response = await request.get('/clothes/1');

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  it('should get a clothes list by request parameter on GET', async () => {
    const response = await request.get('/clothes');

    // console.log('BODY', response.body);
    expect(response.status).toEqual(200);
    expect(response.body[0].data).toEqual({ name: 'Shirt', type: 'silk' });
    expect(response.body[1].data).toEqual({ name: 'Pants', type: 'jeans' });
    expect(response.body[2].data).toEqual({ name: 'Sunglasses', type: 'ray-bans' });
  });

  it('should update an existing clothes on PUT /clothes/:id', async () => {
    const response = await request.put('/clothes/1').send({
      name: 'Belt',
      type: 'Gucci',
    });

    console.log('PUT', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('Belt');
  });

  it('should delete an existing clothes on DELETE', async () => {
    const response = await request.delete('/clothes/1');

    expect(response.status).toEqual(204);
  });
});