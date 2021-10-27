import express from 'express';
import { TodoController } from '../../../controllers';
import { validateCreateTodo, validateUpdateTodo } from '../../../validations';

const router = express.Router();

router.get('/', TodoController.readPagination);

router.post('/', validateCreateTodo, TodoController.create);

router.get('/:id', TodoController.readByID);

router.put('/:id', validateUpdateTodo, TodoController.update);

router.delete('/:id', TodoController.delete);

export default router;
