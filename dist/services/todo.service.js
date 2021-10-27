"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.findTodos = void 0;
const models_1 = require("../models");
const findTodos = async (options) => {
    const todos = await models_1.TodoInstance.findAll(options);
    return todos;
};
exports.findTodos = findTodos;
const getTodo = async (id) => {
    const todo = await models_1.TodoInstance.findOne({ where: { id } });
    return todo;
};
exports.getTodo = getTodo;
const createTodo = async (newTodo) => {
    const { title } = newTodo;
    const createdTodo = await models_1.TodoInstance.create({
        title,
    });
    return createdTodo;
};
exports.createTodo = createTodo;
const updateTodo = async (id, modifiedTodo) => {
    let todo = await exports.getTodo(id);
    const { title, completed } = modifiedTodo;
    if (!todo) {
        return null;
    }
    todo = await todo.update({
        title,
        completed,
    });
    return todo;
};
exports.updateTodo = updateTodo;
const deleteTodo = async (id) => {
    const todo = await exports.getTodo(id);
    if (!todo) {
        return null;
    }
    await todo.destroy();
    return todo;
};
exports.deleteTodo = deleteTodo;
