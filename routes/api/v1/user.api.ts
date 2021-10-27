import express from 'express';
import { UserController } from '../../../controllers';
import { validateUserLogin, validateUserSignup } from '../../../validations';
import { validateToken } from '../../../middlewares';

const router = express.Router();

router.get('/', validateToken, UserController.readPagination);

router.post('/login', validateUserLogin, UserController.login);

router.post('/signup', validateUserSignup, UserController.signup);

export default router;
