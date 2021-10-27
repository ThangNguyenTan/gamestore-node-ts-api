"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genre_service_1 = require("../../services/genre.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Genres Services', () => {
    let createdRecordID;
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`Create Genre Function`, async () => {
        const genreData = {
            genreName: 'Horror',
        };
        const newGenre = await genre_service_1.createGenre(genreData);
        createdRecordID = newGenre?.getDataValue('id');
        expect(newGenre.getDataValue('genreName')).toEqual(genreData.genreName);
    });
    test(`Get All Genres Function`, async () => {
        const genres = await genre_service_1.findGenres();
        expect(genres).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                genreName: expect.any(String),
            }),
        ]));
    });
    test(`Get Genre By Id Function`, async () => {
        const genre = await genre_service_1.getGenre(createdRecordID);
        expect(genre).toEqual(expect.objectContaining({
            id: expect.any(Number),
            genreName: expect.any(String),
        }));
    });
    test(`Update Genre Function`, async () => {
        const modifiedGenreData = {
            genreName: 'Action',
        };
        const updatedGenre = await genre_service_1.updateGenre(createdRecordID, modifiedGenreData);
        expect(updatedGenre?.getDataValue('genreName')).toEqual(modifiedGenreData.genreName);
    });
    test(`Delete Genre Function`, async () => {
        const deletedGenre = await genre_service_1.deleteGenre(createdRecordID);
        expect(deletedGenre?.getDataValue('id')).toEqual(createdRecordID);
    });
});
