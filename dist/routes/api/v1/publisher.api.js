"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../../controllers");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validations_1 = require("../../../validations");
const router = express_1.default.Router();
router.get('/', express_async_handler_1.default(controllers_1.PublisherController.getAll));
router.get('/find', express_async_handler_1.default(controllers_1.PublisherController.readPagination));
router.post('/', validations_1.validateCreatePublisher, express_async_handler_1.default(controllers_1.PublisherController.create));
router.get('/:id', express_async_handler_1.default(controllers_1.PublisherController.readByID));
router.put('/:id', validations_1.validateUpdatePublisher, express_async_handler_1.default(controllers_1.PublisherController.update));
router.delete('/:id', express_async_handler_1.default(controllers_1.PublisherController.delete));
exports.default = router;
