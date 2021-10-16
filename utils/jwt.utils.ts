import jwt from 'jsonwebtoken';
import config from 'config';
import { UserAttributes } from '../models';

export const generateJWTToken = (userDetails: UserAttributes): string => {
  const token = jwt.sign(
    {
      expiresIn: config.get('jwt_expired_date'),
      data: userDetails,
    },
    config.get('jwt_secret')
  );

  return token;
};
