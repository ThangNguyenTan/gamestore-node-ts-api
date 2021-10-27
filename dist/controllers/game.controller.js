"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const generateGamesFilterObject = (searchedGenres, searchedFeatures, searchedName) => {
    let whereClause = {};
    const genres = searchedGenres;
    const features = searchedFeatures;
    if (genres) {
        const genreList = genres.split(',');
        const genreNumberList = genreList.map((genre) => parseInt(genre, 10));
        if (genreList.length > 0) {
            whereClause = {
                ...whereClause,
                GenreInstanceId: {
                    [sequelize_1.Op.or]: genreNumberList,
                },
            };
        }
    }
    if (features) {
        const featureList = features.split(',');
        const featureNumberList = featureList.map((feature) => parseInt(feature, 10));
        if (featureList.length > 0) {
            whereClause = {
                ...whereClause,
                FeatureInstanceId: {
                    [sequelize_1.Op.or]: featureNumberList,
                },
            };
        }
    }
    if (searchedName) {
        whereClause = {
            ...whereClause,
            [sequelize_1.Op.or]: [{ gameName: { [sequelize_1.Op.iLike]: `%${searchedName}%` } }],
        };
    }
    return whereClause;
};
const generateGamesSortObject = (sortBy, sortVariation) => {
    const orderByClause = [];
    if (sortBy) {
        switch (sortBy) {
            case 'gameName':
                orderByClause.push(['gameName', sortVariation]);
                break;
            case 'gamePrice':
                orderByClause.push(['gamePrice', sortVariation]);
                break;
            case 'releaseDate':
                orderByClause.push(['releaseDate', sortVariation]);
                break;
            default:
                orderByClause.push(['releaseDate', sortVariation]);
                break;
        }
    }
    return orderByClause;
};
class GameController {
    async create(req, res) {
        const record = await services_1.createGame({ ...req.body });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(record);
    }
    async getAll(req, res) {
        const records = await services_1.getAllGames();
        return res.status(http_status_codes_1.StatusCodes.OK).json(records);
    }
    async readPagination(req, res) {
        const genres = req.query.genres;
        const features = req.query.features;
        const name = req.query.name;
        const sortBy = req.query.sortBy;
        const page = req.query.page || '1';
        const pageSize = req.query.pageSize || '8';
        const sortVariation = req.query.sortVariation || 'DESC';
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);
        const whereClause = { ...generateGamesFilterObject(genres, features, name) };
        const orderByClause = generateGamesSortObject(sortBy, sortVariation);
        console.log((pageNumber - 1) * pageSizeNumber);
        console.log(pageSizeNumber);
        const result = await services_1.findGames({
            where: whereClause,
            order: orderByClause,
            offset: (pageNumber - 1) * pageSizeNumber,
            limit: pageSizeNumber,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            games: result.rows,
            totalItems: result.count,
            currentPage: pageNumber,
            pageSize: pageSizeNumber,
        });
    }
    async readByID(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getGame(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(record);
    }
    async update(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getGame(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        const updatedRecord = await services_1.updateGame(parseInt(id, 10), { ...req.body });
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRecord);
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getGame(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        const deletedRecord = await services_1.deleteGame(parseInt(id, 10));
        return res.json(deletedRecord);
    }
}
exports.default = new GameController();
