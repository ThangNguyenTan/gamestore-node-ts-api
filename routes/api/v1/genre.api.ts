import express from 'express';
import { GenreController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateGenre, validateUpdateGenre } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(GenreController.readPagination));

router.post('/', validateCreateGenre, asyncHandler(GenreController.create));

router.get('/:id', asyncHandler(GenreController.readByID));

router.put('/:id', validateUpdateGenre, asyncHandler(GenreController.update));

router.delete('/:id', asyncHandler(GenreController.delete));

export default router;
