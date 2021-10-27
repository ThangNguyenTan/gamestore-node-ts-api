"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const seeders_1 = require("../../../seeders");
const router = express_1.default.Router();
router.get('/all', express_async_handler_1.default(async (req, res) => {
    await seeders_1.generateGenres();
    await seeders_1.generateFeatures();
    await seeders_1.generateDevelopers();
    await seeders_1.generatePublishers();
    await seeders_1.generateGames();
    return res.json({
        message: 'Completed',
    });
}));
exports.default = router;
