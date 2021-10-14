import { TodoInstance, TodoAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const findTodos = async (options?: FindOptions<TodoAttributes>): Promise<TodoInstance[]> => {
  const todos = await TodoInstance.findAll(options);

  return todos;
};

export const getTodo = async (id: number): Promise<TodoInstance | null> => {
  const todo = await TodoInstance.findOne({ where: { id } });

  return todo;
};

export const createTodo = async (newTodo: TodoAttributes): Promise<TodoInstance> => {
  const { title } = newTodo;
  const createdTodo = await TodoInstance.create({
    title,
  });

  return createdTodo;
};

export const updateTodo = async (
  id: number,
  modifiedTodo: TodoAttributes
): Promise<TodoInstance | null> => {
  let todo = await getTodo(id);
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

export const deleteTodo = async (id: number): Promise<TodoInstance | null> => {
  const todo = await getTodo(id);

  if (!todo) {
    return null;
  }

  await todo.destroy();

  return todo;
};
