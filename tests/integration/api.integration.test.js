const request = require('supertest');
const app = require('../../src/app');



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
      ...newCar
    });
  });
});



describe('DELETE /api/cars/:carID ', () => {
  it('should have one car less', async () => {
    const { body: oldCarsData } = await request(app).get('/api/cars');
    const carID = oldCarsData[0].id;

    await request(app).delete(`/api/cars/${carID}`);

    const { body: newCarsData } = await request(app).get('/api/cars');

    expect(newCarsData.length).toBeLessThan(oldCarsData.length);
    expect(newCarsData).toHaveLength(oldCarsData.length - 1);
  });


  it('should return a 404 status code if provided a invalid ID', async () => {
    const invalidID = 'some_invalid_id';
    const res = await request(app).delete(`/api/cars/${invalidID}`);

    expect(res.status).toBe(400);
  });
});