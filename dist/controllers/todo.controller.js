"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
class TodoController {
    async create(req, res) {
        const record = await services_1.createTodo({ ...req.body });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(record);
    }
    async readPagination(req, res) {
        const limit = req.query.limit || 10;
        const offset = req.query.offset;
        const records = await services_1.findTodos({ where: {}, limit, offset });
        return res.status(http_status_codes_1.StatusCodes.OK).json(records);
    }
    async readByID(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getTodo(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(record);
    }
    async update(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getTodo(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        const updatedRecord = await services_1.updateTodo(parseInt(id, 10), { ...req.body });
        return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRecord);
    }
    async delete(req, res, next) {
        const { id } = req.params;
        const record = await services_1.getTodo(parseInt(id, 10));
        if (!record) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
        }
        const deletedRecord = await services_1.deleteTodo(parseInt(id, 10));
        return res.json(deletedRecord);
    }
}
exports.default = new TodoController();
