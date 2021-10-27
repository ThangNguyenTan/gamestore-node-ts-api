"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../../controllers");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validations_1 = require("../../../validations");
const middlewares_1 = require("../../../middlewares");
const router = express_1.default.Router();
router.get('/', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.GameController.readPagination));
router.get('/find', express_async_handler_1.default(controllers_1.GameController.readPagination));
router.post('/', middlewares_1.validateToken, validations_1.validateCreateGame, express_async_handler_1.default(controllers_1.GameController.create));
router.get('/:id', express_async_handler_1.default(controllers_1.GameController.readByID));
router.put('/:id', middlewares_1.validateToken, validations_1.validateUpdateGame, express_async_handler_1.default(controllers_1.GameController.update));
router.delete('/:id', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.GameController.delete));
exports.default = router;
