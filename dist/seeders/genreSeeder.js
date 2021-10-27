"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGenres = void 0;
const models_1 = require("../models");
const genreData = [
    {
        genreName: 'Horror',
    },
    {
        genreName: 'Action',
    },
    {
        genreName: 'Adventure',
    },
    {
        genreName: 'RPG',
    },
    {
        genreName: 'Sports',
    },
];
const generateGenres = async () => {
    genreData.forEach(async (genreItem) => {
        await models_1.GenreInstance.create(genreItem);
    });
};
exports.generateGenres = generateGenres;
