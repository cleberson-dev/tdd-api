const { Router } = require('express');
const carsRouter = require('./cars');

const apiRouter = Router();

apiRouter.use('/cars', carsRouter);

module.exports = apiRouter;