import { UserAttributes, UserInstance } from '../models';
import { encrypt } from '../utils';

export const findUsers = async (): Promise<UserInstance[]> => {
  const genres = await UserInstance.findAll();

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
