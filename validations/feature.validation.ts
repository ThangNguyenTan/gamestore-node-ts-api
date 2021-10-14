import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreateFeature = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    featureName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdateFeature = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    featureName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};
