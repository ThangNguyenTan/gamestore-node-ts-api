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
router.get('/', express_async_handler_1.default(controllers_1.TodoController.readPagination));
router.post('/', validations_1.validateCreateTodo, express_async_handler_1.default(controllers_1.TodoController.create));
router.get('/:id', express_async_handler_1.default(controllers_1.TodoController.readByID));
router.put('/:id', validations_1.validateUpdateTodo, express_async_handler_1.default(controllers_1.TodoController.update));
router.delete('/:id', express_async_handler_1.default(controllers_1.TodoController.delete));
exports.default = router;
