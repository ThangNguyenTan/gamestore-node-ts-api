"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feature_service_1 = require("../../services/feature.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Features Services', () => {
    let createdRecordID;
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`Create Feature Function`, async () => {
        const featureData = {
            featureName: 'Horror',
        };
        const newFeature = await feature_service_1.createFeature(featureData);
        createdRecordID = newFeature?.getDataValue('id');
        expect(newFeature.getDataValue('featureName')).toEqual(featureData.featureName);
    });
    test(`Get All Features Function`, async () => {
        const features = await feature_service_1.findFeatures();
        expect(features).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                featureName: expect.any(String),
            }),
        ]));
    });
    test(`Get Feature By Id Function`, async () => {
        const feature = await feature_service_1.getFeature(createdRecordID);
        expect(feature).toEqual(expect.objectContaining({
            id: expect.any(Number),
            featureName: expect.any(String),
        }));
    });
    test(`Update Feature Function`, async () => {
        const modifiedFeatureData = {
            featureName: 'Action',
        };
        const updatedFeature = await feature_service_1.updateFeature(createdRecordID, modifiedFeatureData);
        expect(updatedFeature?.getDataValue('featureName')).toEqual(modifiedFeatureData.featureName);
    });
    test(`Delete Feature Function`, async () => {
        const deletedFeature = await feature_service_1.deleteFeature(createdRecordID);
        expect(deletedFeature?.getDataValue('id')).toEqual(createdRecordID);
    });
});
