import { FindOptions } from 'sequelize';
import { UserAttributes, UserInstance } from '../models';
import { encrypt } from '../utils';

export const findUsers = async (options?: FindOptions<UserAttributes>): Promise<UserInstance[]> => {
  const genres = await UserInstance.findAll(options);

  return genres;
};

export const userSignup = async (newUser: UserAttributes): Promise<UserInstance> => {
  const { email, username } = newUser;
  let { password } = newUser;

  password = encrypt(password);

  const createdUser = await UserInstance.create({
    username,
    email,
    password,
  });

  return createdUser;
};
