import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreateGame = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    gameName: Joi.string().required().max(255),
    gamePoster: Joi.string().required(),
    gameTrailer: Joi.string().required(),
    gameDescription: Joi.string().required(),
    releaseDate: Joi.string().required(),
    publisherId: Joi.number().required(),
    developerId: Joi.number().required(),
    featureId: Joi.number().required(),
    genreId: Joi.number().required(),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdateGame = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    gameName: Joi.string().required().max(255),
    gamePoster: Joi.string().required(),
    gameTrailer: Joi.string().required(),
    gameDescription: Joi.string().required(),
    releaseDate: Joi.string().required(),
    publisherId: Joi.number().required(),
    developerId: Joi.number().required(),
    featureId: Joi.number().required(),
    genreId: Joi.number().required(),
  });

  Middlewares.validateRequest(req, next, schema);
};
