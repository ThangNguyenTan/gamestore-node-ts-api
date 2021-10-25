import express from 'express';
import { FeatureController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateFeature, validateUpdateFeature } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', asyncHandler(FeatureController.getAll));

router.get('/find', validateToken, asyncHandler(FeatureController.readPagination));

router.post('/', validateToken, validateCreateFeature, asyncHandler(FeatureController.create));

router.get('/:id', validateToken, asyncHandler(FeatureController.readByID));

router.put('/:id', validateToken, validateUpdateFeature, asyncHandler(FeatureController.update));

router.delete('/:id', validateToken, asyncHandler(FeatureController.delete));

export default router;
