import { NextFunction, Request, Response } from 'express';
import { userSignup, findUsers } from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { UserInstance } from '../models';
import { generateJWTToken, compare } from '../utils';

class UserController {
  async readPagination(req: Request, res: Response) {
    const records = await findUsers();

    return res.status(StatusCodes.OK).json(records);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;

    const existedUser = await UserInstance.findOne({
      where: {
        email,
      },
    });

    if (existedUser) {
      return next(createError(StatusCodes.BAD_REQUEST, 'Please enter a valid username'));
    }

    const createdUser = await userSignup({ username, email, password });
    const token = generateJWTToken({
      id: createdUser.getDataValue('id'),
      username: createdUser.getDataValue('username'),
      email: createdUser.getDataValue('email'),
      password: createdUser.getDataValue('password'),
    });

    return res.status(StatusCodes.CREATED).json({
      user: createdUser,
      token,
    });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const existedUser = await UserInstance.findOne({
      where: {
        email,
      },
    });

    if (!existedUser || !compare(password, existedUser.getDataValue('password'))) {
      return next(createError(StatusCodes.BAD_REQUEST, 'Please enter a valid email or password'));
    }

    const user = existedUser;
    const token = generateJWTToken({
      id: user.getDataValue('id'),
      username: user.getDataValue('username'),
      email: user.getDataValue('email'),
      password: user.getDataValue('password'),
    });

    return res.status(StatusCodes.OK).json({
      user,
      token,
    });
  }
}

export default new UserController();
