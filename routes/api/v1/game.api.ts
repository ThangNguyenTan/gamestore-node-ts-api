import express from 'express';
import { GameController } from '../../../controllers';
import { validateCreateGame, validateUpdateGame } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', validateToken, GameController.readPagination);

router.get('/find', GameController.readPagination);

router.post('/', validateToken, validateCreateGame, GameController.create);

router.get('/:id', GameController.readByID);

router.put('/:id', validateToken, validateUpdateGame, GameController.update);

router.delete('/:id', validateToken, GameController.delete);

export default router;
