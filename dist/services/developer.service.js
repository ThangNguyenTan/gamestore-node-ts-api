"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeveloper = exports.updateDeveloper = exports.createDeveloper = exports.getDeveloper = exports.findDevelopers = exports.getAllDevelopers = void 0;
const models_1 = require("../models");
const getAllDevelopers = async () => {
    const developers = await models_1.DeveloperInstance.findAll();
    return developers;
};
exports.getAllDevelopers = getAllDevelopers;
const findDevelopers = async (options) => {
    const developers = await models_1.DeveloperInstance.findAll(options);
    return developers;
};
exports.findDevelopers = findDevelopers;
const getDeveloper = async (id) => {
    const developer = await models_1.DeveloperInstance.findOne({ where: { id } });
    return developer;
};
exports.getDeveloper = getDeveloper;
const createDeveloper = async (newDeveloper) => {
    const { developerName } = newDeveloper;
    const createdDeveloper = await models_1.DeveloperInstance.create({
        developerName,
    });
    return createdDeveloper;
};
exports.createDeveloper = createDeveloper;
const updateDeveloper = async (id, modifiedDeveloper) => {
    let developer = await exports.getDeveloper(id);
    const { developerName } = modifiedDeveloper;
    if (!developer) {
        return null;
    }
    developer = await developer.update({
        developerName,
    });
    return developer;
};
exports.updateDeveloper = updateDeveloper;
const deleteDeveloper = async (id) => {
    const developer = await exports.getDeveloper(id);
    if (!developer) {
        return null;
    }
    await developer.destroy();
    return developer;
};
exports.deleteDeveloper = deleteDeveloper;
