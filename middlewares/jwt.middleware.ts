import { verify } from 'jsonwebtoken';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let accessToken = req.header('Authorization');

  if (!accessToken) return next(createError(StatusCodes.UNAUTHORIZED, "You haven't logged in yet"));

  let user;

  // eslint-disable-next-line prefer-destructuring
  accessToken = accessToken.split(' ')[1];

  try {
    const validToken = verify(accessToken, config.get('jwt_secret'));

    if (typeof validToken === 'string') {
      throw new Error('');
    }

    user = validToken.data;
    req.user = user;

    if (!user) {
      return next(createError(StatusCodes.NOT_FOUND, 'This user does not exist'));
    }
    return next();
  } catch (err) {
    return next(createError(StatusCodes.FORBIDDEN, 'Invalid token or limited authority'));
  }
};
