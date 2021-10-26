import express from 'express';
import { GameController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateGame, validateUpdateGame } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', validateToken, asyncHandler(GameController.readPagination));

router.get('/find', asyncHandler(GameController.readPagination));

router.post('/', validateToken, validateCreateGame, asyncHandler(GameController.create));

router.get('/:id', asyncHandler(GameController.readByID));

router.put('/:id', validateToken, validateUpdateGame, asyncHandler(GameController.update));

router.delete('/:id', validateToken, asyncHandler(GameController.delete));

export default router;
