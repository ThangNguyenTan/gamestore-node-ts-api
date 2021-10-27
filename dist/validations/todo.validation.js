"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTodo = exports.validateCreateTodo = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = __importDefault(require("../middlewares"));
const validateCreateTodo = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateCreateTodo = validateCreateTodo;
const validateUpdateTodo = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().max(255),
        completed: joi_1.default.boolean().required(),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUpdateTodo = validateUpdateTodo;
