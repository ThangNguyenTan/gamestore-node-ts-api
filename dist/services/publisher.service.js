"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePublisher = exports.updatePublisher = exports.createPublisher = exports.getPublisher = exports.findPublishers = exports.getAllPublishers = void 0;
const models_1 = require("../models");
const getAllPublishers = async () => {
    const publishers = await models_1.PublisherInstance.findAll();
    return publishers;
};
exports.getAllPublishers = getAllPublishers;
const findPublishers = async (options) => {
    const publishers = await models_1.PublisherInstance.findAll(options);
    return publishers;
};
exports.findPublishers = findPublishers;
const getPublisher = async (id) => {
    const publisher = await models_1.PublisherInstance.findOne({ where: { id } });
    return publisher;
};
exports.getPublisher = getPublisher;
const createPublisher = async (newPublisher) => {
    const { publisherName } = newPublisher;
    const createdPublisher = await models_1.PublisherInstance.create({
        publisherName,
    });
    return createdPublisher;
};
exports.createPublisher = createPublisher;
const updatePublisher = async (id, modifiedPublisher) => {
    let publisher = await exports.getPublisher(id);
    const { publisherName } = modifiedPublisher;
    if (!publisher) {
        return null;
    }
    publisher = await publisher.update({
        publisherName,
    });
    return publisher;
};
exports.updatePublisher = updatePublisher;
const deletePublisher = async (id) => {
    const publisher = await exports.getPublisher(id);
    if (!publisher) {
        return null;
    }
    await publisher.destroy();
    return publisher;
};
exports.deletePublisher = deletePublisher;
