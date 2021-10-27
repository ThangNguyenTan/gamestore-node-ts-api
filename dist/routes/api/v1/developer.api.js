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
router.get('/', express_async_handler_1.default(controllers_1.DeveloperController.getAll));
router.get('/find', express_async_handler_1.default(controllers_1.DeveloperController.readPagination));
router.post('/', validations_1.validateCreateDeveloper, express_async_handler_1.default(controllers_1.DeveloperController.create));
router.get('/:id', express_async_handler_1.default(controllers_1.DeveloperController.readByID));
router.put('/:id', validations_1.validateUpdateDeveloper, express_async_handler_1.default(controllers_1.DeveloperController.update));
router.delete('/:id', express_async_handler_1.default(controllers_1.DeveloperController.delete));
exports.default = router;
