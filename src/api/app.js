const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const cors = require('cors');
const compression = require('compression');
const routes = require("./routes");
const morgan = require('morgan')
const PREFIX = "/task-manager";

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('combined'));

app.use(PREFIX, routes);
app.use(errorHandler);

module.exports = app;
