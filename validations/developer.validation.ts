import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreateDeveloper = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    developerName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdateDeveloper = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    developerName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};
