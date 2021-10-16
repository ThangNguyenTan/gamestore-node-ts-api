import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateUserSignup = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    username: Joi.string().required().max(255),
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUserLogin = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};
