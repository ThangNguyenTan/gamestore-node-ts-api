import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreateGenre = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    genreName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdateGenre = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    genreName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};
