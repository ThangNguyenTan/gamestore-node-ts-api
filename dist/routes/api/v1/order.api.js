"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../../controllers");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
router.get('/', express_async_handler_1.default(controllers_1.OrderController.getOrdersForLibrary));
router.get('/check/:gameId', express_async_handler_1.default(controllers_1.OrderController.getIsInLibrary));
router.post('/pay', express_async_handler_1.default(controllers_1.OrderController.create));
exports.default = router;
