import express from 'express';
import { GenreController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateGenre, validateUpdateGenre } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', asyncHandler(GenreController.getAll));

router.get('/find', validateToken, asyncHandler(GenreController.readPagination));

router.post('/', validateToken, validateCreateGenre, asyncHandler(GenreController.create));

router.get('/:id', validateToken, asyncHandler(GenreController.readByID));

router.put('/:id', validateToken, validateUpdateGenre, asyncHandler(GenreController.update));

router.delete('/:id', validateToken, asyncHandler(GenreController.delete));

export default router;
