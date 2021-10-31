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

const mainApiURL = `/api/v1/wishlist`;

let createdRecordID: number;
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
      username: 'wishlist_service1',
      email: 'wishlist_service1@gmail.com',
      password: 'wishlist_service1',
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

  test(`POST ${mainApiURL} -> create and return a new wishlist`, async () => {
    const newWishlist = {
      gameItem: {
        id: createdGameInstanceId,
      },
    };

    const response = await request(app)
      .post(`${mainApiURL}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newWishlist)
      .expect('Content-Type', /json/)
      .expect(201);

    createdRecordID = response.body.id;

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        UserInstanceId: expect.any(Number),
        GameInstanceId: expect.any(Number),
      })
    );
  });

  test(`GET ${mainApiURL} -> array of wishlist items`, async () => {
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
        }),
      ])
    );
  });

  test(`GET ${mainApiURL}/check/:gameId -> check the existence of a wishlist item`, async () => {
    const response = await request(app)
      .get(`${mainApiURL}/check/${createdGameInstanceId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        UserInstanceId: expect.any(Number),
        GameInstanceId: expect.any(Number),
      })
    );
  });

  test(`DELETE ${mainApiURL}/id -> return the deleted wishlist`, async () => {
    const response = await request(app)
      .delete(`${mainApiURL}/${createdRecordID}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        UserInstanceId: expect.any(Number),
        GameInstanceId: expect.any(Number),
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
