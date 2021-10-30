import { NextFunction, Request, Response } from 'express';
import {
  getAllWishlist,
  createWishlist,
  removeWishlist,
  getWishlist,
  getIsInWishlist,
} from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

class GenreController {
  async create(req: Request, res: Response) {
    const record = await createWishlist({
      UserInstanceId: req.user!.id!,
      GameInstanceId: req.body.gameItem.id,
    });
    return res.status(StatusCodes.CREATED).json(record);
  }

  async getAll(req: Request, res: Response) {
    const records = await getAllWishlist(req.user!.id!);

    return res.status(StatusCodes.OK).json(records);
  }

  async getIsInWishlist(req: Request, res: Response) {
    const userId = req.user?.id;
    const gameId = req.params.gameId;
    const record = await getIsInWishlist(userId!, parseInt(gameId, 10));

    return res.status(StatusCodes.OK).json(record);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getWishlist(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const deletedRecord = await removeWishlist(parseInt(id, 10));

    return res.json(deletedRecord);
  }
}

export default new GenreController();
