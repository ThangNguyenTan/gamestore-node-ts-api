import express from 'express';
import { GameController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateGame, validateUpdateGame } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(GameController.readPagination));

router.post('/', validateCreateGame, asyncHandler(GameController.create));

router.get('/:id', asyncHandler(GameController.readByID));

router.put('/:id', validateUpdateGame, asyncHandler(GameController.update));

router.delete('/:id', asyncHandler(GameController.delete));

export default router;
