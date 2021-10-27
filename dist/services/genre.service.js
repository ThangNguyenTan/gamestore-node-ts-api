"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenre = exports.findGenres = exports.getAllGenres = void 0;
const models_1 = require("../models");
const getAllGenres = async () => {
    const genres = await models_1.GenreInstance.findAll();
    return genres;
};
exports.getAllGenres = getAllGenres;
const findGenres = async (options) => {
    const genres = await models_1.GenreInstance.findAll(options);
    return genres;
};
exports.findGenres = findGenres;
const getGenre = async (id) => {
    const genre = await models_1.GenreInstance.findOne({ where: { id } });
    return genre;
};
exports.getGenre = getGenre;
const createGenre = async (newGenre) => {
    const { genreName } = newGenre;
    const createdGenre = await models_1.GenreInstance.create({
        genreName,
    });
    return createdGenre;
};
exports.createGenre = createGenre;
const updateGenre = async (id, modifiedGenre) => {
    let genre = await exports.getGenre(id);
    const { genreName } = modifiedGenre;
    if (!genre) {
        return null;
    }
    genre = await genre.update({
        genreName,
    });
    return genre;
};
exports.updateGenre = updateGenre;
const deleteGenre = async (id) => {
    const genre = await exports.getGenre(id);
    if (!genre) {
        return null;
    }
    await genre.destroy();
    return genre;
};
exports.deleteGenre = deleteGenre;
