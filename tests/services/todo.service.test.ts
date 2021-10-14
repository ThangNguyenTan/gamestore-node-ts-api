import {
  findTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../services/todo.service';
import db from '../../config/database.config';

describe('Todos Services', () => {
  let createdRecordID: number | undefined;

  beforeAll(async () => {
    await db.sync();
  });

  test(`Create Todo Function`, async () => {
    const todoData = {
      title: 'Do Homework',
    };

    const newTodo = await createTodo(todoData);

    createdRecordID = newTodo?.getDataValue('id');

    expect(newTodo.getDataValue('title')).toEqual(todoData.title);
  });

  test(`Get All Todos Function`, async () => {
    const todos = await findTodos();

    expect(todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
        }),
      ])
    );
  });

  test(`Get Todo By Id Function`, async () => {
    const todo = await getTodo(createdRecordID!);

    expect(todo).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
      })
    );
  });

  test(`Update Todo Function`, async () => {
    const modifiedTodoData = {
      title: 'Do Homework',
    };
    const updatedTodo = await updateTodo(createdRecordID!, modifiedTodoData);

    expect(updatedTodo?.getDataValue('title')).toEqual(modifiedTodoData.title);
  });

  test(`Delete Todo Function`, async () => {
    const deletedTodo = await deleteTodo(createdRecordID!);

    expect(deletedTodo?.getDataValue('id')).toEqual(createdRecordID);
  });
});
