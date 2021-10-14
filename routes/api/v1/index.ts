import express from 'express';
import todosApiRouter from './todo.api';

const router = express.Router();

router.use('/todos', todosApiRouter);

export default router;
