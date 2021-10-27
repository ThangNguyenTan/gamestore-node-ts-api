"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.getGame = exports.findGames = exports.getAllGames = void 0;
const models_1 = require("../models");
const getAllGames = async () => {
    const games = await models_1.GameInstance.findAll();
    return games;
};
exports.getAllGames = getAllGames;
const findGames = async (options) => {
    const games = await models_1.GameInstance.findAndCountAll({
        ...options,
        include: [models_1.FeatureInstance, models_1.GenreInstance, models_1.DeveloperInstance, models_1.PublisherInstance],
    });
    return games;
};
exports.findGames = findGames;
const getGame = async (id) => {
    const game = await models_1.GameInstance.findOne({
        where: { id },
        include: [models_1.FeatureInstance, models_1.GenreInstance, models_1.DeveloperInstance, models_1.PublisherInstance],
    });
    return game;
};
exports.getGame = getGame;
const createGame = async (newGame) => {
    const { gameName, gamePrice, gamePoster, gameTrailer, gameDescription, releaseDate, PublisherInstanceId, DeveloperInstanceId, FeatureInstanceId, GenreInstanceId, } = newGame;
    const createdGame = await models_1.GameInstance.create({
        gameName,
        gamePrice,
        gamePoster,
        gameTrailer,
        gameDescription,
        releaseDate,
        PublisherInstanceId,
        DeveloperInstanceId,
        FeatureInstanceId,
        GenreInstanceId,
    });
    return createdGame;
};
exports.createGame = createGame;
const updateGame = async (id, modifiedGame) => {
    let game = await exports.getGame(id);
    const { gameName, gamePrice, gamePoster, gameTrailer, gameDescription, releaseDate, PublisherInstanceId, DeveloperInstanceId, FeatureInstanceId, GenreInstanceId, } = modifiedGame;
    if (!game) {
        return null;
    }
    game = await game.update({
        gameName,
        gamePrice,
        gamePoster,
        gameTrailer,
        gameDescription,
        releaseDate,
        PublisherInstanceId,
        DeveloperInstanceId,
        FeatureInstanceId,
        GenreInstanceId,
    });
    return game;
};
exports.updateGame = updateGame;
const deleteGame = async (id) => {
    const game = await exports.getGame(id);
    if (!game) {
        return null;
    }
    await game.destroy();
    return game;
};
exports.deleteGame = deleteGame;
