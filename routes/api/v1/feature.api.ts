import express from 'express';
import { FeatureController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateFeature, validateUpdateFeature } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(FeatureController.readPagination));

router.post('/', validateCreateFeature, asyncHandler(FeatureController.create));

router.get('/:id', asyncHandler(FeatureController.readByID));

router.put('/:id', validateUpdateFeature, asyncHandler(FeatureController.update));

router.delete('/:id', asyncHandler(FeatureController.delete));

export default router;
