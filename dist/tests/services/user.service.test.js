"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../../services/user.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Users Services', () => {
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`User Signup Function`, async () => {
        const userData = {
            username: 'Test_user_1',
            email: 'Test_user_1@gmail.com',
            password: 'Test_user_1',
        };
        const newUser = await user_service_1.userSignup(userData);
        expect(newUser.getDataValue('username')).toEqual(userData.username);
        expect(newUser.getDataValue('email')).toEqual(userData.email);
    });
});
