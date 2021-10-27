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
router.get('/', express_async_handler_1.default(controllers_1.GenreController.getAll));
router.get('/find', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.GenreController.readPagination));
router.post('/', middlewares_1.validateToken, validations_1.validateCreateGenre, express_async_handler_1.default(controllers_1.GenreController.create));
router.get('/:id', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.GenreController.readByID));
router.put('/:id', middlewares_1.validateToken, validations_1.validateUpdateGenre, express_async_handler_1.default(controllers_1.GenreController.update));
router.delete('/:id', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.GenreController.delete));
exports.default = router;
