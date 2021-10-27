import express from 'express';
import { GenreController } from '../../../controllers';
import { validateCreateGenre, validateUpdateGenre } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', GenreController.getAll);

router.get('/find', validateToken, GenreController.readPagination);

router.post('/', validateToken, validateCreateGenre, GenreController.create);

router.get('/:id', validateToken, GenreController.readByID);

router.put('/:id', validateToken, validateUpdateGenre, GenreController.update);

router.delete('/:id', validateToken, GenreController.delete);

export default router;
