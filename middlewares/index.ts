import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator';
import config from 'config';
import debugLogger from '../logger/debug-logger';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

class Middleware {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error.array()[0]);
    }
    next();
  }

  defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    debugLogger({
      statusCode,
      ...err,
    });

    if (config.get('node_env') === 'production') {
      if (statusCode === 500) {
        return res.status(statusCode).send({ message: 'Internal Server Error' });
      }
    }

    return res.status(statusCode).send({ statusCode, ...err });
  };

  validateRequest(req: Request, next: NextFunction, schema: Schema) {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return next(
        createError(
          StatusCodes.UNPROCESSABLE_ENTITY,
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`
        )
      );
    }
    req.body = value;
    return next();
  }
}

const Middlewares = new Middleware();

export * from './jwt.middleware';
export default Middlewares;
