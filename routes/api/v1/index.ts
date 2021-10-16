import express from 'express';
import todosApiRouter from './todo.api';
import publishersApiRouter from './publisher.api';
import developersApiRouter from './developer.api';
import genresApiRouter from './genre.api';
import featuresApiRouter from './feature.api';
import usersApiRouter from './user.api';

const router = express.Router();

router.use('/todos', todosApiRouter);

router.use('/publishers', publishersApiRouter);

router.use('/developers', developersApiRouter);

router.use('/genres', genresApiRouter);

router.use('/features', featuresApiRouter);

router.use('/users', usersApiRouter);

export default router;
