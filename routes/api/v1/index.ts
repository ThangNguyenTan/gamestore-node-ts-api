import express from 'express';
import todosApiRouter from './todo.api';
import publishersApiRouter from './publisher.api';
import developersApiRouter from './developer.api';

const router = express.Router();

router.use('/todos', todosApiRouter);

router.use('/publishers', publishersApiRouter);

router.use('/developers', developersApiRouter);

export default router;
