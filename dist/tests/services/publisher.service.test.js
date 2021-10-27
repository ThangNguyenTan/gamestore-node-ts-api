"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publisher_service_1 = require("../../services/publisher.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Publishers Services', () => {
    let createdRecordID;
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`Create Publisher Function`, async () => {
        const publisherData = {
            publisherName: 'Samsung',
        };
        const newPublisher = await publisher_service_1.createPublisher(publisherData);
        createdRecordID = newPublisher?.getDataValue('id');
        expect(newPublisher.getDataValue('publisherName')).toEqual(publisherData.publisherName);
    });
    test(`Get All Publishers Function`, async () => {
        const publishers = await publisher_service_1.findPublishers();
        expect(publishers).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                publisherName: expect.any(String),
            }),
        ]));
    });
    test(`Get Publisher By Id Function`, async () => {
        const publisher = await publisher_service_1.getPublisher(createdRecordID);
        expect(publisher).toEqual(expect.objectContaining({
            id: expect.any(Number),
            publisherName: expect.any(String),
        }));
    });
    test(`Update Publisher Function`, async () => {
        const modifiedPublisherData = {
            publisherName: 'Sony',
        };
        const updatedPublisher = await publisher_service_1.updatePublisher(createdRecordID, modifiedPublisherData);
        expect(updatedPublisher?.getDataValue('publisherName')).toEqual(modifiedPublisherData.publisherName);
    });
    test(`Delete Publisher Function`, async () => {
        const deletedPublisher = await publisher_service_1.deletePublisher(createdRecordID);
        expect(deletedPublisher?.getDataValue('id')).toEqual(createdRecordID);
    });
});
