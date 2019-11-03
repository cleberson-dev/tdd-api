const uuid = require('uuid/v4');


// Using hardcoded data, for this project (without mocking any DB)
const carsData = [
  { id: uuid(), model: 'Silverado', make: 'Chevrolet' }
];


module.exports = {
  getAllCars() {
    return [...carsData];
  }
}