import express from 'express';
import { PublisherController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateCreatePublisher, validateUpdatePublisher } from '../../../validations';

const router = express.Router();

router.get('/', asyncHandler(PublisherController.readPagination));

router.post('/', validateCreatePublisher, asyncHandler(PublisherController.create));

router.get('/:id', asyncHandler(PublisherController.readByID));

router.put('/:id', validateUpdatePublisher, asyncHandler(PublisherController.update));

router.delete('/:id', asyncHandler(PublisherController.delete));

export default router;
