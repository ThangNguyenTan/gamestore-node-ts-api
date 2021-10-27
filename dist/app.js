"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("./middlewares"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const v1_1 = __importDefault(require("./routes/api/v1"));
const routes_1 = __importDefault(require("./routes"));
const database_config_1 = __importDefault(require("./config/database.config"));
const app = express_1.default();
// Sync DB
database_config_1.default.sync({
    logging: config_1.default.get('allow_logging'),
});
// Middlewares
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
// Routes
app.use('/', routes_1.default);
app.use('/api/v1', v1_1.default);
// Error Handler
app.use(middlewares_1.default.defaultErrorHandler);
exports.default = app;
