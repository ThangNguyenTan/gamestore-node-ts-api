"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const developer_service_1 = require("../../services/developer.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Developers Services', () => {
    let createdRecordID;
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`Create Developer Function`, async () => {
        const developerData = {
            developerName: 'Samsung',
        };
        const newDeveloper = await developer_service_1.createDeveloper(developerData);
        createdRecordID = newDeveloper?.getDataValue('id');
        expect(newDeveloper.getDataValue('developerName')).toEqual(developerData.developerName);
    });
    test(`Get All Developers Function`, async () => {
        const developers = await developer_service_1.findDevelopers();
        expect(developers).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                developerName: expect.any(String),
            }),
        ]));
    });
    test(`Get Developer By Id Function`, async () => {
        const developer = await developer_service_1.getDeveloper(createdRecordID);
        expect(developer).toEqual(expect.objectContaining({
            id: expect.any(Number),
            developerName: expect.any(String),
        }));
    });
    test(`Update Developer Function`, async () => {
        const modifiedDeveloperData = {
            developerName: 'Sony',
        };
        const updatedDeveloper = await developer_service_1.updateDeveloper(createdRecordID, modifiedDeveloperData);
        expect(updatedDeveloper?.getDataValue('developerName')).toEqual(modifiedDeveloperData.developerName);
    });
    test(`Delete Developer Function`, async () => {
        const deletedDeveloper = await developer_service_1.deleteDeveloper(createdRecordID);
        expect(deletedDeveloper?.getDataValue('id')).toEqual(createdRecordID);
    });
});
