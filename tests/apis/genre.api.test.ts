/* eslint-disable no-await-in-loop */
import request from 'supertest';
import app from '../../app';
import db from '../../config/database.config';

const mainApiURL = `/api/v1/genres`;

const invalidDataList = [
  {
    genreName: '',
  },
  {},
];

let createdRecordID: number;

describe('Genres API', () => {
  beforeAll(async () => {
    await db.sync();
  });

  test(`POST ${mainApiURL} -> create and return a new genre`, async () => {
    const newGenre = {
      genreName: 'Horror',
    };

    const response = await request(app)
      .post(`${mainApiURL}`)
      .send(newGenre)
      .expect('Content-Type', /json/)
      .expect(201);

    createdRecordID = response.body.id;

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        genreName: expect.any(String),
      })
    );
  });

  test(`POST ${mainApiURL} -> return 422 if enter invalid data`, async () => {
    for (let i = 0; i < invalidDataList.length; i += 1) {
      const currentData = invalidDataList[i];

      const response = await request(app)
        .post(`${mainApiURL}`)
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

  test(`GET ${mainApiURL} -> array of genres`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          genreName: expect.any(String),
        }),
      ])
    );
  });

  test(`GET ${mainApiURL}/id -> a genre`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/${createdRecordID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        genreName: expect.any(String),
      })
    );
  });

  test(`GET ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/9999`)
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
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`PUT ${mainApiURL}/id -> return the updated genre`, async () => {
    const modifiedGenre = {
      genreName: 'Action',
    };

    const response = await request(app)
      .put(`${mainApiURL}/${createdRecordID}`)
      .send(modifiedGenre)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        genreName: expect.any(String),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> return the deleted genre`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/${createdRecordID}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        genreName: expect.any(String),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> 404 if not found`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/9999`)
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
