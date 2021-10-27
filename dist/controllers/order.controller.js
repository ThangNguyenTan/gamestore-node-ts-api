"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
class OrderController {
    async getOrdersForLibrary(req, res) {
        const records = await services_1.getOrdersForLibrary(req.user.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json(records);
    }
    async getIsInLibrary(req, res) {
        const userId = req.user?.id;
        const gameId = req.params.gameId;
        const record = await services_1.getIsInLibrary(userId, parseInt(gameId, 10));
        if (record) {
            return res.status(http_status_codes_1.StatusCodes.OK).json(true);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json(false);
    }
    async create(req, res, next) {
        if (req.body.paymentResult.status !== 'COMPLETED') {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'The payment was not completed'));
        }
        await services_1.createOrder({
            paymentId: req.body.paymentResult.id,
            UserInstanceId: req.user.id,
            GameInstanceId: req.body.gameItem.id,
            total: req.body.gameItem.gamePrice,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(true);
    }
}
exports.default = new OrderController();
