import express from 'express';
import { DeveloperController } from '../../../controllers';
import { validateCreateDeveloper, validateUpdateDeveloper } from '../../../validations';

const router = express.Router();

router.get('/', DeveloperController.getAll);

router.get('/find', DeveloperController.readPagination);

router.post('/', validateCreateDeveloper, DeveloperController.create);

router.get('/:id', DeveloperController.readByID);

router.put('/:id', validateUpdateDeveloper, DeveloperController.update);

router.delete('/:id', DeveloperController.delete);

export default router;
