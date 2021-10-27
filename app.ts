import express from 'express';
import Middlewares from './middlewares';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import config from 'config';

import apiV1Router from './routes/api/v1';
import indexRouter from './routes';
import db from './config/database.config';

const app = express();

// Sync DB
try {
  db.sync({
    logging: config.get('allow_logging'),
  });
} catch (error) {
  console.log(error);
}

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api/v1', apiV1Router);

// Error Handler
app.use(Middlewares.defaultErrorHandler);

export default app;
