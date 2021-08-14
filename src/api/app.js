const express = require('express');
const routes = require('./routes');

const app = express();
const PREFIX = '/task-manager';

app.use(express.json());
app.use(PREFIX, routes);

module.exports=app;
