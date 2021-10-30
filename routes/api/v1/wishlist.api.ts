import express from 'express';
import { WishlistController } from '../../../controllers';

const router = express.Router();

router.get('/', WishlistController.getAll);

router.get('/check/:gameId', WishlistController.getIsInWishlist);

router.post('/', WishlistController.create);

router.delete('/:id', WishlistController.delete);

export default router;
