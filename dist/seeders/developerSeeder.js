"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDevelopers = void 0;
const models_1 = require("../models");
const developerData = [
    {
        developerName: 'Square Enix',
    },
    {
        developerName: 'Visual Concepts',
    },
    {
        developerName: 'Ubisoft',
    },
    {
        developerName: 'Rockstar Games',
    },
];
const generateDevelopers = async () => {
    developerData.forEach(async (developerItem) => {
        await models_1.DeveloperInstance.create(developerItem);
    });
};
exports.generateDevelopers = generateDevelopers;
