"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const database_config_1 = __importDefault(require("../../config/database.config"));
const mainApiURL = `/api/v1/features`;
const invalidDataList = [
    {
        featureName: '',
    },
    {},
];
let createdRecordID;
describe('Features API', () => {
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`POST ${mainApiURL} -> create and return a new feature`, async () => {
        const newFeature = {
            featureName: 'Single Player',
        };
        const response = await supertest_1.default(app_1.default)
            .post(`${mainApiURL}`)
            .send(newFeature)
            .expect('Content-Type', /json/)
            .expect(201);
        createdRecordID = response.body.id;
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            featureName: expect.any(String),
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
    test(`GET ${mainApiURL} -> array of features`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                featureName: expect.any(String),
            }),
        ]));
    });
    test(`GET ${mainApiURL}/id -> a feature`, async () => {
        const response = await supertest_1.default(app_1.default)
            .get(`${mainApiURL}/${createdRecordID}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            featureName: expect.any(String),
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
    test(`PUT ${mainApiURL}/id -> return the updated feature`, async () => {
        const modifiedFeature = {
            featureName: 'Multi-players',
        };
        const response = await supertest_1.default(app_1.default)
            .put(`${mainApiURL}/${createdRecordID}`)
            .send(modifiedFeature)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            featureName: expect.any(String),
        }));
    });
    test(`DELETE ${mainApiURL}/id -> return the deleted feature`, async () => {
        const response = await supertest_1.default(app_1.default)
            .delete(`${mainApiURL}/${createdRecordID}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            featureName: expect.any(String),
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
