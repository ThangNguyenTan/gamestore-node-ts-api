import express from 'express';
import { PublisherController } from '../../../controllers';
import { validateCreatePublisher, validateUpdatePublisher } from '../../../validations';

const router = express.Router();

router.get('/', PublisherController.getAll);

router.get('/find', PublisherController.readPagination);

router.post('/', validateCreatePublisher, PublisherController.create);

router.get('/:id', PublisherController.readByID);

router.put('/:id', validateUpdatePublisher, PublisherController.update);

router.delete('/:id', PublisherController.delete);

export default router;
