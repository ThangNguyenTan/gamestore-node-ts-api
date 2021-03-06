#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http';
import app from '../app';
import debugLogger from '../logger/debug-logger';
import config from 'config';
import db from '../config/database.config';

// Sync DB
db.authenticate();
db.sync({
  logging: config.get('allow_logging'),
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const innerPort = parseInt(val, 10);

  if (Number.isNaN(innerPort)) {
    // named pipe
    return val;
  }

  if (innerPort >= 0) {
    // port number
    return innerPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debugLogger(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debugLogger(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  debugLogger(`Server is running on http://localhost:${port}`);
}
