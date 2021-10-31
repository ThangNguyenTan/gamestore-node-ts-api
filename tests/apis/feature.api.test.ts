/* eslint-disable no-await-in-loop */
import request from 'supertest';
import app from '../../app';
import db from '../../config/database.config';
import { userSignup } from '../../services';
import { generateJWTToken } from '../../utils';

const mainApiURL = `/api/v1/features`;

const invalidDataList = [
  {
    featureName: '',
  },
  {},
];

let createdRecordID: number;
let token: string;

describe('Features API', () => {
  beforeAll(async () => {
    await db.sync({
      logging: false,
    });

    const createdUser = await userSignup({
      username: 'feature1',
      email: 'feature1@gmail.com',
      password: 'feature1',
    });
    token = generateJWTToken({
      id: createdUser.getDataValue('id'),
      username: createdUser.getDataValue('username'),
      email: createdUser.getDataValue('email'),
      password: createdUser.getDataValue('password'),
    });
  });

  test(`POST ${mainApiURL} -> create and return a new feature`, async () => {
    const newFeature = {
      featureName: 'Single Player',
    };

    const response = await request(app)
      .post(`${mainApiURL}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newFeature)
      .expect('Content-Type', /json/)
      .expect(201);

    createdRecordID = response.body.id;

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        featureName: expect.any(String),
      })
    );
  });

  test(`POST ${mainApiURL} -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .post(`${mainApiURL}`)
        .set('Authorization', `Bearer ${token}`)
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

  test(`GET ${mainApiURL} -> array of features`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          featureName: expect.any(String),
        }),
      ])
    );
  });

  test(`GET ${mainApiURL}/id -> a feature`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/${createdRecordID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        featureName: expect.any(String),
      })
    );
  });

  test(`GET ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/9999`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/9999`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> return the updated feature`, async () => {
    const modifiedFeature = {
      featureName: 'Multi-players',
    };

    const response = await request(app)
      .put(`${mainApiURL}/${createdRecordID}`)
      .set('Authorization', `Bearer ${token}`)
      .send(modifiedFeature)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        featureName: expect.any(String),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> return the deleted feature`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/${createdRecordID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        featureName: expect.any(String),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/9999`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });
});
