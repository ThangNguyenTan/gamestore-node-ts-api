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
router.get('/', middlewares_1.validateToken, express_async_handler_1.default(controllers_1.UserController.readPagination));
router.post('/login', validations_1.validateUserLogin, express_async_handler_1.default(controllers_1.UserController.login));
router.post('/signup', validations_1.validateUserSignup, express_async_handler_1.default(controllers_1.UserController.signup));
exports.default = router;
