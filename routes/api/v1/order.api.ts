import express from 'express';
import { OrderController } from '../../../controllers';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(OrderController.getOrdersForLibrary));

router.get('/check/:gameId', asyncHandler(OrderController.getIsInLibrary));

router.post('/pay', asyncHandler(OrderController.create));

export default router;
