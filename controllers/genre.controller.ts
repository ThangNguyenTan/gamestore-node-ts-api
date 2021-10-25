import { NextFunction, Request, Response } from 'express';
import {
  getGenre,
  findGenres,
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
} from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

class GenreController {
  async create(req: Request, res: Response) {
    const record = await createGenre({ ...req.body });
    return res.status(StatusCodes.CREATED).json(record);
  }

  async getAll(req: Request, res: Response) {
    const records = await getAllGenres();

    return res.status(StatusCodes.OK).json(records);
  }

  async readPagination(req: Request, res: Response) {
    const limit = (req.query.limit as number | undefined) || 10;
    const offset = req.query.offset as number | undefined;

    const records = await findGenres({ where: {}, limit, offset });

    return res.status(StatusCodes.OK).json(records);
  }

  async readByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGenre(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    return res.status(StatusCodes.OK).json(record);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGenre(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const updatedRecord = await updateGenre(parseInt(id, 10), { ...req.body });
    return res.status(StatusCodes.OK).json(updatedRecord);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGenre(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const deletedRecord = await deleteGenre(parseInt(id, 10));

    return res.json(deletedRecord);
  }
}

export default new GenreController();
