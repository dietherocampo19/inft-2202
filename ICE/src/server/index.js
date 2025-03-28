import express from "express";
import config from './service/config.js';
import bodyParser from 'body-parser';
import loggingMiddleware from './loggingMiddleware.js';
import userLoggingMiddleware from './userLoggingMiddleware.js';
import { validationMiddleware } from './validationMiddleware.js';
import errorHandler from './errorHandler.js';
import { createAnimal, animalValidationRules } from './animalController.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(loggingMiddleware);

app.use((req, res, next) => {
    req.user = { id: '123' }; //Simulate user object, remove in real app
    next();
});

app.use(userLoggingMiddleware);

app.post('/animals', validationMiddleware(animalValidationRules), createAnimal);

app.use(errorHandler);

console.log(config);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});