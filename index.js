const PORT = 2000;
const express = require('express');
const server = express();

const { client } = require('./db');
client.connect();

const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);

const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});