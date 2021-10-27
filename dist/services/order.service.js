"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrdersForLibrary = exports.getIsInLibrary = void 0;
const models_1 = require("../models");
const getIsInLibrary = async (userId, gameId) => {
    const order = await models_1.OrderInstance.findOne({
        where: {
            UserInstanceId: userId,
            GameInstanceId: gameId,
        },
    });
    return order;
};
exports.getIsInLibrary = getIsInLibrary;
const getOrdersForLibrary = async (userId) => {
    const orders = await models_1.OrderInstance.findAll({
        where: {
            UserInstanceId: userId,
        },
        include: [
            {
                model: models_1.GameInstance,
                include: [models_1.DeveloperInstance, models_1.PublisherInstance],
            },
        ],
    });
    return orders;
};
exports.getOrdersForLibrary = getOrdersForLibrary;
const createOrder = async (newOrder) => {
    const createdOrder = await models_1.OrderInstance.create(newOrder);
    return createdOrder;
};
exports.createOrder = createOrder;
