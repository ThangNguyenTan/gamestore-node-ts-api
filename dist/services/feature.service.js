"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeature = exports.findFeatures = exports.getAllFeatures = void 0;
const models_1 = require("../models");
const getAllFeatures = async () => {
    const features = await models_1.FeatureInstance.findAll();
    return features;
};
exports.getAllFeatures = getAllFeatures;
const findFeatures = async (options) => {
    const features = await models_1.FeatureInstance.findAll(options);
    return features;
};
exports.findFeatures = findFeatures;
const getFeature = async (id) => {
    const feature = await models_1.FeatureInstance.findOne({ where: { id } });
    return feature;
};
exports.getFeature = getFeature;
const createFeature = async (newFeature) => {
    const { featureName } = newFeature;
    const createdFeature = await models_1.FeatureInstance.create({
        featureName,
    });
    return createdFeature;
};
exports.createFeature = createFeature;
const updateFeature = async (id, modifiedFeature) => {
    let feature = await exports.getFeature(id);
    const { featureName } = modifiedFeature;
    if (!feature) {
        return null;
    }
    feature = await feature.update({
        featureName,
    });
    return feature;
};
exports.updateFeature = updateFeature;
const deleteFeature = async (id) => {
    const feature = await exports.getFeature(id);
    if (!feature) {
        return null;
    }
    await feature.destroy();
    return feature;
};
exports.deleteFeature = deleteFeature;
