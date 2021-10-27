import express from 'express';
import { FeatureController } from '../../../controllers';
import { validateCreateFeature, validateUpdateFeature } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', FeatureController.getAll);

router.get('/find', validateToken, FeatureController.readPagination);

router.post('/', validateToken, validateCreateFeature, FeatureController.create);

router.get('/:id', validateToken, FeatureController.readByID);

router.put('/:id', validateToken, validateUpdateFeature, FeatureController.update);

router.delete('/:id', validateToken, FeatureController.delete);

export default router;
