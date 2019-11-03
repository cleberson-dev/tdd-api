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

// POST '/api/cars' --> Create a new car
carsRouter.post('/', (req, res) => {
  const { make, model } = req.body;
  
  if (!make || !model) {
    res.status(400);
    return res.json({ success: false , msg: 'Campos inválidos' });
  }

  const newCarData = CarModel.createNewCar(make, model);
  res.status(201);
  res.json(newCarData);
});

// DELETE 'api/cars/:carID' --> Remove a car
carsRouter.delete('/:carID', (req, res) => {
  const { carID } = req.params;

  try {
    CarModel.removeCar(carID);
    res.status(200);
    res.json({ success: true });
  } catch (e) {
    res.status(400);
    res.json({ success: false });
  }
})

module.exports = carsRouter;