"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePublishers = void 0;
const models_1 = require("../models");
const publisherData = [
    {
        publisherName: 'Square Enix',
    },
    {
        publisherName: '2K',
    },
    {
        publisherName: 'Ubisoft',
    },
    {
        publisherName: 'Rockstar Games',
    },
];
const generatePublishers = async () => {
    publisherData.forEach(async (publisherItem) => {
        await models_1.PublisherInstance.create(publisherItem);
    });
};
exports.generatePublishers = generatePublishers;
