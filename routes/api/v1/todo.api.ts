import express from 'express';
import { TodoController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateTodo, validateUpdateTodo } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(TodoController.readPagination));

router.post('/', validateCreateTodo, asyncHandler(TodoController.create));

router.get('/:id', asyncHandler(TodoController.readByID));

router.put('/:id', validateUpdateTodo, asyncHandler(TodoController.update));

router.delete('/:id', asyncHandler(TodoController.delete));

export default router;
