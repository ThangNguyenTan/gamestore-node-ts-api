import express from 'express';
import todosApiRouter from './todo.api';
import publishersApiRouter from './publisher.api';
import developersApiRouter from './developer.api';
import genresApiRouter from './genre.api';
import featuresApiRouter from './feature.api';
import usersApiRouter from './user.api';
import gamesApiRouter from './game.api';
import seederApiRouter from './seeder.api';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.use('/todos', validateToken, todosApiRouter);

router.use('/publishers', validateToken, publishersApiRouter);

router.use('/developers', validateToken, developersApiRouter);

router.use('/genres', genresApiRouter);

router.use('/features', featuresApiRouter);

router.use('/users', usersApiRouter);

router.use('/games', gamesApiRouter);

router.use('/seed', seederApiRouter);

export default router;
