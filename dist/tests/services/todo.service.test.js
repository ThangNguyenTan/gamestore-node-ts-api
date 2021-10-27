"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_service_1 = require("../../services/todo.service");
const database_config_1 = __importDefault(require("../../config/database.config"));
describe('Todos Services', () => {
    let createdRecordID;
    beforeAll(async () => {
        await database_config_1.default.sync({
            logging: false,
        });
    });
    test(`Create Todo Function`, async () => {
        const todoData = {
            title: 'Do Homework',
        };
        const newTodo = await todo_service_1.createTodo(todoData);
        createdRecordID = newTodo?.getDataValue('id');
        expect(newTodo.getDataValue('title')).toEqual(todoData.title);
    });
    test(`Get All Todos Function`, async () => {
        const todos = await todo_service_1.findTodos();
        expect(todos).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
            }),
        ]));
    });
    test(`Get Todo By Id Function`, async () => {
        const todo = await todo_service_1.getTodo(createdRecordID);
        expect(todo).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
        }));
    });
    test(`Update Todo Function`, async () => {
        const modifiedTodoData = {
            title: 'Do Homework',
        };
        const updatedTodo = await todo_service_1.updateTodo(createdRecordID, modifiedTodoData);
        expect(updatedTodo?.getDataValue('title')).toEqual(modifiedTodoData.title);
    });
    test(`Delete Todo Function`, async () => {
        const deletedTodo = await todo_service_1.deleteTodo(createdRecordID);
        expect(deletedTodo?.getDataValue('id')).toEqual(createdRecordID);
    });
});
