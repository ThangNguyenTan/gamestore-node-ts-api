import { NextFunction, Request, Response } from 'express';
import {
  getFeature,
  findFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  getAllFeatures,
} from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

class FeatureController {
  async create(req: Request, res: Response) {
    const record = await createFeature({ ...req.body });
    return res.status(StatusCodes.CREATED).json(record);
  }

  async getAll(req: Request, res: Response) {
    const records = await getAllFeatures();

    return res.status(StatusCodes.OK).json(records);
  }

  async readPagination(req: Request, res: Response) {
    const limit = (req.query.limit as number | undefined) || 10;
    const offset = req.query.offset as number | undefined;

    const records = await findFeatures({ where: {}, limit, offset });

    return res.status(StatusCodes.OK).json(records);
  }

  async readByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getFeature(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    return res.status(StatusCodes.OK).json(record);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getFeature(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const updatedRecord = await updateFeature(parseInt(id, 10), { ...req.body });
    return res.status(StatusCodes.OK).json(updatedRecord);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getFeature(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const deletedRecord = await deleteFeature(parseInt(id, 10));

    return res.json(deletedRecord);
  }
}

export default new FeatureController();
