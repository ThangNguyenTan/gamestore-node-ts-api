import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreatePublisher = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    publisherName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdatePublisher = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    publisherName: Joi.string().required().max(255),
  });

  Middlewares.validateRequest(req, next, schema);
};
