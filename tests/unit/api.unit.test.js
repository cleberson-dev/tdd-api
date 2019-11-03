jest.mock('../../src/models/Car.model.js');

const request = require('supertest');
const app = require('../../src/app');
const CarModel = require('../../src/models/Car.model');

const mockData = [
  { id: 'sdferwr', make: 'Chevrolet', model: 'Silverado' }
];

CarModel.getAllCars.mockReturnValue(mockData);
CarModel.createNewCar.mockReturnValue(mockData[0]);

const carSchema = {
  id: expect.any(String),
  make: expect.any(String),
  model: expect.any(String)
};


describe('GET /api/cars ', () => {  
  it('should return a list of car objects on response body (with make and model)', async () => {
    const res = await request(app).get('/api/cars');
    expect(res.body).toContainEqual(carSchema);
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
  it('should return a car object on response body', async () => {
    const newCar = {
      make: 'Chevrolet',
      model: 'Onix'
    };

    const res = await request(app)
      .post('/api/cars')
      .send(newCar);

    expect(res.body).toMatchObject(carSchema);
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
  it('should return a 200 status code on success response', async () => {
    CarModel.getAllCars.mockReturnValue(mockData);
    const { body: carsData } = await request(app).get('/api/cars');
    const carID = carsData[0].id;

    const res = await request(app).delete(`/api/cars/${carID}`);

    expect(res.status).toBe(200);
  });

  it('should return a 404 status code if CarModel.removeCar() throws an error', async () => {
    CarModel.removeCar.mockImplementation(() => {
      throw new Error();
    });

    const invalidID = 'some_invalid_id';
    const res = await request(app).delete(`/api/cars/${invalidID}`);

    expect(res.status).toBe(400);
  });
});