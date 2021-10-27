"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFeatures = void 0;
const models_1 = require("../models");
const featureData = [
    {
        featureName: 'Single Player',
    },
    {
        featureName: 'Multiplayer',
    },
];
const generateFeatures = async () => {
    featureData.forEach(async (featureItem) => {
        await models_1.FeatureInstance.create(featureItem);
    });
};
exports.generateFeatures = generateFeatures;
