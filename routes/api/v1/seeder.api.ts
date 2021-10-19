import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  generateGenres,
  generateFeatures,
  generateDevelopers,
  generatePublishers,
  generateGames,
} from '../../../seeders';

const router = express.Router();

router.get(
  '/all',
  asyncHandler(async (req: Request, res: Response): Promise<Response> => {
    await generateGenres();
    await generateFeatures();
    await generateDevelopers();
    await generatePublishers();
    await generateGames();

    return res.json({
      message: 'Completed',
    });
  })
);

export default router;
