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
router.get('/', express_async_handler_1.default(controllers_1.FeatureController.getAll));
router.get('/find', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.FeatureController.readPagination));
router.post('/', middlewares_1.validateToken, validations_1.validateCreateFeature, express_async_handler_1.default(controllers_1.FeatureController.create));
router.get('/:id', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.FeatureController.readByID));
router.put('/:id', middlewares_1.validateToken, validations_1.validateUpdateFeature, express_async_handler_1.default(controllers_1.FeatureController.update));
router.delete('/:id', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.FeatureController.delete));
exports.default = router;
