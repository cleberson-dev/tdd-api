jest.mock('../src/models/Car.model.js');

const request = require('supertest');
const app = require('../src/app');
const CarModel = require('../src/models/Car.model');

CarModel.getAllCars.mockReturnValue([{ id: 'sdferwr', make: 'Chevrolet', model: 'Silverado' }]);
CarModel.createNewCar.mockReturnValue({ id: 'sdferwr', make: 'Chevrolet', model: 'Silverado' });

describe('GET /api/cars ', () => {  
  it('should return a list of car objects (with make and model)', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.body).toContainEqual({
      id: expect.any(String),
      make: expect.any(String),
      model: expect.any(String)
    });
  });

  it('should return a 200 status code on response', async () => {
    const res = await request(app).get('/api/cars');

    expect(res.status).toBe(200);
  });

  it('should return a 204 status code on response if there are no cars', async () => {
    CarModel.getAllCars.mockReturnValue([]);
    
    const res = await request(app).get('/api/cars');
    
    expect(res.status).toBe(204);
  });
});





describe('POST /api/cars ', () => {
  it('should return the created car object on success response', async () => {
    const newCar = {
      make: 'Chevrolet',
      model: 'Onix'
    };

    const res = await request(app)
      .post('/api/cars')
      .send(newCar);

    expect(res.body).toMatchObject({
      id: expect.any(String),
      make: expect.any(String),
      model: expect.any(String)
    });
  });


  it('should return a 201 status code on success response', async () => {
    const newCar = {
      make: 'Chevrolet',
      model: 'Onix'
    };

    const res = await request(app)
      .post('/api/cars')
      .send(newCar);

    expect(res.status).toBe(201);
  });

  it('should return a 400 status code on response if the object properties dont match', async () => {
    const person = {
      name: 'Cleberson',
      age: 20
    };

    const res = await request(app)
      .post('/api/cars')
      .send(person);

    expect(res.status).toBe(400);
  });
});





describe('DELETE /api/cars/:carID ', () => {
  it('should have one car less', async () => {
    const { body: oldCarsData } = await request(app).get('/api/cars');
    const carID = oldCarsData[0].id;

    await request(app).delete(`/api/cars/${carID}`);

    const { body: newCarsData } = await request(app).get('/api/cars');

    expect(newCarsData).toBeLessThan(oldCarsData.length);
    expect(newCarsData).toHaveLength(oldCarsData.length - 1);
  });

  it('should return a 200 status code on success response', async () => {
    const { body: carsData } = await request(app).get('/api/cars');
    const carID = carsData[0].id;

    const res = await request(app).delete(`/api/cars/${carID}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 status code on response if the carID is not found', async () => {
    const invalidID = 'ahjhjsda';
    const res = await request(app).delete(`/api/cars/${invalidID}`);

    expect(res.status).toBe(404);
  });
});