import express from 'express';
import { UserController } from '../../../controllers';
import asyncHandler from 'express-async-handler';
import { validateUserLogin, validateUserSignup } from '../../../validations';

const router = express.Router();

router.post('/login', validateUserLogin, asyncHandler(UserController.login));

router.post('/signup', validateUserSignup, asyncHandler(UserController.signup));

export default router;
