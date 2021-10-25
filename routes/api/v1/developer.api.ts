import express from 'express';
import { DeveloperController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreateDeveloper, validateUpdateDeveloper } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(DeveloperController.getAll));

router.get('/find', asyncHandler(DeveloperController.readPagination));

router.post('/', validateCreateDeveloper, asyncHandler(DeveloperController.create));

router.get('/:id', asyncHandler(DeveloperController.readByID));

router.put('/:id', validateUpdateDeveloper, asyncHandler(DeveloperController.update));

router.delete('/:id', asyncHandler(DeveloperController.delete));

export default router;
