import express, { Request, Response } from 'express';
import todosApiRouter from './todo.api';
import publishersApiRouter from './publisher.api';
import developersApiRouter from './developer.api';
import genresApiRouter from './genre.api';
import featuresApiRouter from './feature.api';
import usersApiRouter from './user.api';
import gamesApiRouter from './game.api';
import seederApiRouter from './seeder.api';
import orderApiRouter from './order.api';
import wishlistApiRouter from './wishlist.api';
import { validateToken } from '../../../middlewares';
import config from 'config';

const router = express.Router();

router.get('/config/paypal', (req: Request, res: Response) => {
  res.send(config.get('paypal_client_id') || 'sb');
});

router.use('/orders', validateToken, orderApiRouter);

router.use('/wishlist', validateToken, wishlistApiRouter);

router.use('/todos', validateToken, todosApiRouter);

router.use('/publishers', validateToken, publishersApiRouter);

router.use('/developers', validateToken, developersApiRouter);

router.use('/genres', genresApiRouter);

router.use('/features', featuresApiRouter);

router.use('/users', usersApiRouter);

router.use('/games', gamesApiRouter);

router.use('/seed', seederApiRouter);

export default router;
