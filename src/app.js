const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api');



const app = express();
app.use(express.json());

app.use('/api', apiRouter);



module.exports = app;