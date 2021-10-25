import Joi from 'joi';
import Middlewares from '../middlewares';
import { Request, Response, NextFunction } from 'express';

export const validateCreateGame = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    gameName: Joi.string().required().max(255),
    gamePrice: Joi.number().required(),
    gamePoster: Joi.string().required(),
    gameTrailer: Joi.string().required(),
    gameDescription: Joi.string().required(),
    releaseDate: Joi.string().required(),
    PublisherInstanceId: Joi.number().required(),
    DeveloperInstanceId: Joi.number().required(),
    FeatureInstanceId: Joi.number().required(),
    GenreInstanceId: Joi.number().required(),
  });

  Middlewares.validateRequest(req, next, schema);
};

export const validateUpdateGame = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    gameName: Joi.string().required().max(255),
    gamePrice: Joi.number().required(),
    gamePoster: Joi.string().required(),
    gameTrailer: Joi.string().required(),
    gameDescription: Joi.string().required(),
    releaseDate: Joi.string().required(),
    PublisherInstanceId: Joi.number().required(),
    DeveloperInstanceId: Joi.number().required(),
    FeatureInstanceId: Joi.number().required(),
    GenreInstanceId: Joi.number().required(),
  });

  Middlewares.validateRequest(req, next, schema);
};
