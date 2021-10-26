import { Request, Response, NextFunction } from 'express';
import { createOrder, getIsInLibrary, getOrdersForLibrary } from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

class OrderController {
  async getOrdersForLibrary(req: Request, res: Response) {
    const records = await getOrdersForLibrary(req.user!.id!);

    return res.status(StatusCodes.OK).json(records);
  }

  async getIsInLibrary(req: Request, res: Response) {
    const userId = req.user?.id;
    const gameId = req.params.gameId;
    const record = await getIsInLibrary(userId!, parseInt(gameId, 10));

    if (record) {
      return res.status(StatusCodes.OK).json(true);
    }

    return res.status(StatusCodes.OK).json(false);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (req.body.paymentResult.status !== 'COMPLETED') {
      return next(createError(StatusCodes.BAD_REQUEST, 'The payment was not completed'));
    }

    await createOrder({
      paymentId: req.body.paymentResult.id,
      UserInstanceId: req.user!.id!,
      GameInstanceId: req.body.gameItem.id,
      total: req.body.gameItem.gamePrice,
    });

    return res.status(StatusCodes.CREATED).json(true);
  }
}

export default new OrderController();
