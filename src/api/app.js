const express = require('express');
const errorHandler = require('../middleware/errorHandler');
const routes = require('./routes');

const app = express();
const PREFIX = '/task-manager';

app.use(express.json());
app.use(PREFIX, routes);
app.use(errorHandler);

module.exports = app;
