/* eslint-disable no-await-in-loop */
import request from 'supertest';
import app from '../../app';
import db from '../../config/database.config';
import {
  createDeveloper,
  createFeature,
  createGame,
  createGenre,
  createPublisher,
  userSignup,
} from '../../services';
import { generateJWTToken } from '../../utils';

const mainApiURL = `/api/v1/orders`;

let token: string;
let createdGameInstanceId: number | undefined;
let createdGenreInstanceId: number | undefined;
let createdFeatureInstanceId: number | undefined;
let createdDeveloperInstanceId: number | undefined;
let createdPublisherInstanceId: number | undefined;

describe('Genres API', () => {
  beforeAll(async () => {
    await db.sync({
      logging: false,
    });

    // Create User
    const createdUser = await userSignup({
      username: 'order_service1',
      email: 'order_service1@gmail.com',
      password: 'order_service1',
    });
    token = generateJWTToken({
      id: createdUser.getDataValue('id'),
      username: createdUser.getDataValue('username'),
      email: createdUser.getDataValue('email'),
      password: createdUser.getDataValue('password'),
    });

    // Create Genre
    const newGenre = await createGenre({
      genreName: 'Test Genre 1',
    });
    createdGenreInstanceId = newGenre?.getDataValue('id');

    // Create Feature
    const newFeature = await createFeature({
      featureName: 'Test Feature 1',
    });
    createdFeatureInstanceId = newFeature?.getDataValue('id');

    // Create Publisher
    const newPublisher = await createPublisher({
      publisherName: 'Test Publisher 1',
    });
    createdPublisherInstanceId = newPublisher?.getDataValue('id');

    // Create Developer
    const newDeveloper = await createDeveloper({
      developerName: 'Test Developer 1',
    });
    createdDeveloperInstanceId = newDeveloper?.getDataValue('id');

    // Create Game
    const gameData = {
      gameName: 'Test Game 1',
      gamePoster: 'Test Game 1',
      gameTrailer: 'Test Game 1',
      gameDescription: 'Test Game 1',
      releaseDate: '2021-09-11',
      gamePrice: 19.99,
      PublisherInstanceId: createdPublisherInstanceId!,
      DeveloperInstanceId: createdDeveloperInstanceId!,
      FeatureInstanceId: createdFeatureInstanceId!,
      GenreInstanceId: createdGenreInstanceId!,
    };

    const newGame = await createGame(gameData);
    createdGameInstanceId = newGame.getDataValue('id');
  });

  test(`POST ${mainApiURL}/pay -> create and return a new order`, async () => {
    const newOrder = {
      gameItem: {
        id: createdGameInstanceId,
        gamePrice: 19.99,
      },
      paymentResult: {
        status: 'COMPLETED',
        id: 'asdjhasidgaisd',
      },
    };

    const response = await request(app)
      .post(`${mainApiURL}/pay`)
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toBeTruthy();
  });

  test(`POST ${mainApiURL}/pay -> 400 if status is not COMPLETED`, async () => {
    const newOrder = {
      gameItem: {
        id: createdGameInstanceId,
        gamePrice: 19.99,
      },
      paymentResult: {
        status: 'PENDING',
        id: 'asdjhasidgaisd',
      },
    };

    const response = await request(app)
      .post(`${mainApiURL}/pay`)
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: expect.any(Number),
        message: expect.any(String),
      })
    );
  });

  test(`GET ${mainApiURL} -> array of order items`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          UserInstanceId: expect.any(Number),
          GameInstanceId: expect.any(Number),
          total: expect.any(Number),
          paymentId: expect.any(String),
        }),
      ])
    );
  });

  test(`GET ${mainApiURL} -> order list for library`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/mine`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          UserInstanceId: expect.any(Number),
          GameInstanceId: expect.any(Number),
          total: expect.any(Number),
          paymentId: expect.any(String),
        }),
      ])
    );
  });

  test(`GET ${mainApiURL}/check/:gameId -> check the existence of a order item`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/check/${createdGameInstanceId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeTruthy();
  });
});
