"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_config_1 = __importDefault(require("../../config/database.config"));
const services_1 = require("../../services");
const mainApiURL = `/api/v1/games`;
const invalidDataList = [
    {
        gamePoster: 'Test Game 1',
        gameTrailer: 'Test Game 1',
        gameDescription: 'Test Game 1',
        releaseDate: '2021-09-11',
    },
    {
        gameName: 'Test Game 1',
        gameTrailer: 'Test Game 1',
        gameDescription: 'Test Game 1',
        releaseDate: '2021-09-11',
    },
    {
        gameName: 'Test Game 1',
        gamePoster: 'Test Game 1',
        gameDescription: 'Test Game 1',
        releaseDate: '2021-09-11',
    },
    {
        gameName: 'Test Game 1',
        gamePoster: 'Test Game 1',
        gameTrailer: 'Test Game 1',
        releaseDate: '2021-09-11',
    },
    {
        gameName: 'Test Game 1',
        gamePoster: 'Test Game 1',
        gameTrailer: 'Test Game 1',
        gameDescription: 'Test Game 1',
    },
    {},
];
let createdRecordID;
let createdGenreInstanceId;
let createdFeatureInstanceId;
let createdDeveloperInstanceId;
let createdPublisherInstanceId;
describe('Games API', () => {
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
        // Create Genre
        const newGenre = await services_1.createGenre({
            genreName: 'Test Genre 2',
        });
        createdGenreInstanceId = newGenre?.getDataValue('id');
        // Create Feature
        const newFeature = await services_1.createFeature({
            featureName: 'Test Feature 2',
        });
        createdFeatureInstanceId = newFeature?.getDataValue('id');
        // Create Publisher
        const newPublisher = await services_1.createPublisher({
            publisherName: 'Test Publisher 2',
        });
        createdPublisherInstanceId = newPublisher?.getDataValue('id');
        // Create Developer
        const newDeveloper = await services_1.createDeveloper({
            developerName: 'Test Developer 2',
        });
        createdDeveloperInstanceId = newDeveloper?.getDataValue('id');
    });
    test(`POST ${mainApiURL} -> create and return a new game`, async () => {
        const newGame = {
            gameName: 'Test Game 2',
            gamePoster: 'Test Game 2',
            gameTrailer: 'Test Game 2',
            gameDescription: 'Test Game 2',
            releaseDate: '2021-10-11',
            gamePrice: 29.99,
            PublisherInstanceId: createdPublisherInstanceId,
            DeveloperInstanceId: createdDeveloperInstanceId,
            FeatureInstanceId: createdFeatureInstanceId,
            GenreInstanceId: createdGenreInstanceId,
        };
        const response = await supertest_1.default(app_1.default)
            .post(`${mainApiURL}`)
            .send(newGame)
            .expect('Content-Type', /json/)
            .expect(201);
        createdRecordID = response.body.id;
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            gameName: expect.any(String),
            gamePoster: expect.any(String),
            gameTrailer: expect.any(String),
            gameDescription: expect.any(String),
            releaseDate: expect.any(String),
            PublisherInstanceId: expect.any(Number),
            FeatureInstanceId: expect.any(Number),
            DeveloperInstanceId: expect.any(Number),
            GenreInstanceId: expect.any(Number),
        }));
    });
    test(`POST ${mainApiURL} -> return 422 if enter invalid data`, async () => {
        for (let i = 0; i < invalidDataList.length; i += 1) {
            const currentData = invalidDataList[i];
            const response = await supertest_1.default(app_1.default)
                .post(`${mainApiURL}`)
                .send(currentData)
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body).toEqual(expect.objectContaining({
                statusCode: expect.any(Number),
                message: expect.any(String),
            }));
        }
    });
    test(`GET ${mainApiURL} -> array of games`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                gameName: expect.any(String),
                gamePoster: expect.any(String),
                gameTrailer: expect.any(String),
                gameDescription: expect.any(String),
                releaseDate: expect.any(String),
                PublisherInstanceId: expect.any(Number),
                FeatureInstanceId: expect.any(Number),
                DeveloperInstanceId: expect.any(Number),
                GenreInstanceId: expect.any(Number),
            }),
        ]));
    });
    test(`GET ${mainApiURL}/id -> a game`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}/${createdRecordID}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            gameName: expect.any(String),
            gamePoster: expect.any(String),
            gameTrailer: expect.any(String),
            gameDescription: expect.any(String),
            releaseDate: expect.any(String),
            PublisherInstanceId: expect.any(Number),
            FeatureInstanceId: expect.any(Number),
            DeveloperInstanceId: expect.any(Number),
            GenreInstanceId: expect.any(Number),
        }));
    });
    test(`GET ${mainApiURL}/id -> 404 if not found`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}/9999`)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body).toEqual(expect.objectContaining({
            statusCode: expect.any(Number),
            message: expect.any(String),
        }));
    });
    test(`PUT ${mainApiURL}/id -> 404 if not found`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}/9999`)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body).toEqual(expect.objectContaining({
            statusCode: expect.any(Number),
            message: expect.any(String),
        }));
    });
    test(`PUT ${mainApiURL}/id -> return the updated game`, async () => {
        const modifiedGame = {
            gameName: 'Test Game 234',
            gamePoster: 'Test Game 234',
            gameTrailer: 'Test Game 234',
            gameDescription: 'Test Game 234',
            releaseDate: '2021-10-13',
            gamePrice: 19.99,
            PublisherInstanceId: createdPublisherInstanceId,
            DeveloperInstanceId: createdDeveloperInstanceId,
            FeatureInstanceId: createdFeatureInstanceId,
            GenreInstanceId: createdGenreInstanceId,
        };
        const response = await supertest_1.default(app_1.default)
            .put(`${mainApiURL}/${createdRecordID}`)
            .send(modifiedGame)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            gameName: expect.any(String),
            gamePoster: expect.any(String),
            gameTrailer: expect.any(String),
            gameDescription: expect.any(String),
            releaseDate: expect.any(String),
            PublisherInstanceId: expect.any(Number),
            FeatureInstanceId: expect.any(Number),
            DeveloperInstanceId: expect.any(Number),
            GenreInstanceId: expect.any(Number),
        }));
    });
    test(`DELETE ${mainApiURL}/id -> return the deleted game`, async () => {
        const response = await supertest_1.default(app_1.default)
            .delete(`${mainApiURL}/${createdRecordID}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            gameName: expect.any(String),
            gamePoster: expect.any(String),
            gameTrailer: expect.any(String),
            gameDescription: expect.any(String),
            releaseDate: expect.any(String),
            PublisherInstanceId: expect.any(Number),
            FeatureInstanceId: expect.any(Number),
            DeveloperInstanceId: expect.any(Number),
            GenreInstanceId: expect.any(Number),
        }));
    });
    test(`DELETE ${mainApiURL}/id -> 404 if not found`, async () => {
        const response = await supertest_1.default(app_1.default)
            .delete(`${mainApiURL}/9999`)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body).toEqual(expect.objectContaining({
            statusCode: expect.any(Number),
            message: expect.any(String),
        }));
    });
});
