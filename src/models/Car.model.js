const uuid = require('uuid/v4');


// Using hardcoded data, for this project (without mocking any DB)
const carsData = [
  { id: uuid(), make: 'Chevrolet', model: 'Silverado' }
];


module.exports = {
  createNewCar(make, model) {
    const newCar = { id: uuid(), make, model };
    carsData.push(newCar);
    return newCar;
  },
  getAllCars() {
    return [...carsData];
  }
}