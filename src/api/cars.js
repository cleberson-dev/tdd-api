const { Router } = require('express');
const CarModel = require('../models/Car.model');

const carsRouter = Router();



// GET '/api/cars' --> Get all cars
carsRouter.get('/', (req, res) => {
  const cars = CarModel.getAllCars();
  
  res.status(200);
  if (cars.length === 0) res.status(204);

  res.json(cars);
});

module.exports = carsRouter;