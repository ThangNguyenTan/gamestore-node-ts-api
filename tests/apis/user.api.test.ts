/* eslint-disable no-await-in-loop */
import request from 'supertest';
import app from '../../app';
import db from '../../config/database.config';

const mainApiURL = `/api/v1/users`;

const invalidDataList = [
  {
    username: 'asd',
    email: 'asd',
  },
  {
    username: 'asd',
    password: 'asd',
  },
  {
    username: 'asd',
    email: 'asd',
  },
  {},
];

describe('Users API', () => {
  beforeAll(async () => {
    await db.sync();
  });

  test(`POST ${mainApiURL}/signup -> create and return a new user`, async () => {
    const newUser = {
      username: 'UserAPI1',
      email: 'UserAPI1@gmail.com',
      password: 'UserAPI1',
    };

    const response = await request(app)
      .post(`${mainApiURL}/signup`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
        }),
      })
    );
  });

  test(`POST ${mainApiURL}/signup -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .post(`${mainApiURL}/signup`)
        .send(currentData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    }
  });

  test(`POST ${mainApiURL}/login -> create and return a new user`, async () => {
    const newUser = {
      email: 'UserAPI1@gmail.com',
      password: 'UserAPI1',
    };

    const response = await request(app)
      .post(`${mainApiURL}/login`)
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
        }),
      })
    );
  });

  test(`POST ${mainApiURL}/login -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .post(`${mainApiURL}/login`)
        .send(currentData)
        .expect('Content-Type', /json/)
        .expect(422);

      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: expect.any(Number),
          message: expect.any(String),
        })
      );
    }
  });
});
