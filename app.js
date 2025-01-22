require('dotenv').config();
const cors = require("cors");
const express = require('express');
const logger = require('./middlewares/logger');
const app = express();

//logger setup
app.use(logger.requestLogger);
 
app.use((req, res, next) => {
  res.on('finish', () => {
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} - ${res.statusMessage}`;
    if (res.statusCode >= 400) {
      logger.error(log);
    } else {
      logger.info(log);
    }
  });
  next();
});
 
app.use((err, req, res, next) => {
  logger.error('Unhandled Error', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
    query: req.query
  });
  res.status(500).send('Something broke!');
});
