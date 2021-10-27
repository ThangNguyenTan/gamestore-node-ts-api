"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateGame = exports.validateCreateGame = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = __importDefault(require("../middlewares"));
const validateCreateGame = (req, res, next) => {
    const schema = joi_1.default.object({
        gameName: joi_1.default.string().required().max(255),
        gamePrice: joi_1.default.number().required(),
        gamePoster: joi_1.default.string().required(),
        gameTrailer: joi_1.default.string().required(),
        gameDescription: joi_1.default.string().required(),
        releaseDate: joi_1.default.string().required(),
        PublisherInstanceId: joi_1.default.number().required(),
        DeveloperInstanceId: joi_1.default.number().required(),
        FeatureInstanceId: joi_1.default.number().required(),
        GenreInstanceId: joi_1.default.number().required(),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateCreateGame = validateCreateGame;
const validateUpdateGame = (req, res, next) => {
    const schema = joi_1.default.object({
        gameName: joi_1.default.string().required().max(255),
        gamePrice: joi_1.default.number().required(),
        gamePoster: joi_1.default.string().required(),
        gameTrailer: joi_1.default.string().required(),
        gameDescription: joi_1.default.string().required(),
        releaseDate: joi_1.default.string().required(),
        PublisherInstanceId: joi_1.default.number().required(),
        DeveloperInstanceId: joi_1.default.number().required(),
        FeatureInstanceId: joi_1.default.number().required(),
        GenreInstanceId: joi_1.default.number().required(),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUpdateGame = validateUpdateGame;
