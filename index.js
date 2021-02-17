'use strict';

require('dotenv').config();

// start an express server
const server = require('./src/server.js');
const PORT = process.env.PORT;

server.start(PORT);