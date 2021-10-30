import express from 'express';
import { OrderController } from '../../../controllers';

const router = express.Router();

router.get('/', OrderController.getAll);

router.get('/mine', OrderController.getOrdersForLibrary);

router.get('/check/:gameId', OrderController.getIsInLibrary);

router.post('/pay', OrderController.create);

export default router;
