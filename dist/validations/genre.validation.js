"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateGenre = exports.validateCreateGenre = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = __importDefault(require("../middlewares"));
const validateCreateGenre = (req, res, next) => {
    const schema = joi_1.default.object({
        genreName: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateCreateGenre = validateCreateGenre;
const validateUpdateGenre = (req, res, next) => {
    const schema = joi_1.default.object({
        genreName: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUpdateGenre = validateUpdateGenre;
