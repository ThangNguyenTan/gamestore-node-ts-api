"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdatePublisher = exports.validateCreatePublisher = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = __importDefault(require("../middlewares"));
const validateCreatePublisher = (req, res, next) => {
    const schema = joi_1.default.object({
        publisherName: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateCreatePublisher = validateCreatePublisher;
const validateUpdatePublisher = (req, res, next) => {
    const schema = joi_1.default.object({
        publisherName: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUpdatePublisher = validateUpdatePublisher;
