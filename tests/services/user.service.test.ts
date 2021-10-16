import { userSignup } from '../../services/user.service';
import db from '../../config/database.config';

describe('Users Services', () => {
  beforeAll(async () => {
    await db.sync({
      logging: false,
    });
  });

  test(`User Signup Function`, async () => {
    const userData = {
      username: 'Test_user_1',
      email: 'Test_user_1@gmail.com',
      password: 'Test_user_1',
    };

    const newUser = await userSignup(userData);

    expect(newUser.getDataValue('username')).toEqual(userData.username);
    expect(newUser.getDataValue('email')).toEqual(userData.email);
  });
});
