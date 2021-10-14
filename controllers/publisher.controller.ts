import { NextFunction, Request, Response } from 'express';
import {
  getPublisher,
  findPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

class PublisherController {
  async create(req: Request, res: Response) {
    const record = await createPublisher({ ...req.body });
    return res.status(StatusCodes.CREATED).json(record);
  }

  async readPagination(req: Request, res: Response) {
    const limit = (req.query.limit as number | undefined) || 10;
    const offset = req.query.offset as number | undefined;

    const records = await findPublishers({ where: {}, limit, offset });

    return res.status(StatusCodes.OK).json(records);
  }

  async readByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getPublisher(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    return res.status(StatusCodes.OK).json(record);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getPublisher(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const updatedRecord = await updatePublisher(parseInt(id, 10), { ...req.body });
    return res.status(StatusCodes.OK).json(updatedRecord);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getPublisher(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const deletedRecord = await deletePublisher(parseInt(id, 10));

    return res.json(deletedRecord);
  }
}

export default new PublisherController();
