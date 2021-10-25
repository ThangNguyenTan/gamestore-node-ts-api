import { NextFunction, Request, Response } from 'express';
import { getGame, findGames, createGame, updateGame, deleteGame, getAllGames } from '../services';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { Op, WhereOptions, Order, OrderItem } from 'sequelize';

const generateGamesFilterObject = (
  searchedGenres: string,
  searchedFeatures: string,
  searchedName: string
): WhereOptions => {
  let whereClause = {};
  const genres = searchedGenres;
  const features = searchedFeatures;

  if (genres) {
    const genreList = genres.split(',');
    const genreNumberList = genreList.map((genre: string) => parseInt(genre, 10));
    if (genreList.length > 0) {
      whereClause = {
        ...whereClause,
        GenreInstanceId: {
          [Op.or]: genreNumberList,
        },
      };
    }
  }

  if (features) {
    const featureList = features.split(',');
    const featureNumberList = featureList.map((feature: string) => parseInt(feature, 10));
    if (featureList.length > 0) {
      whereClause = {
        ...whereClause,
        FeatureInstanceId: {
          [Op.or]: featureNumberList,
        },
      };
    }
  }

  if (searchedName) {
    whereClause = {
      ...whereClause,
      [Op.or]: [{ gameName: { [Op.iLike]: `%${searchedName}%` } }],
    };
  }

  return whereClause;
};

const generateGamesSortObject = (sortBy: string, sortVariation: string): Order => {
  const orderByClause = [];

  if (sortBy) {
    switch (sortBy) {
      case 'gameName':
        orderByClause.push(['gameName', sortVariation] as OrderItem);
        break;
      case 'gamePrice':
        orderByClause.push(['gamePrice', sortVariation] as OrderItem);
        break;
      case 'releaseDate':
        orderByClause.push(['releaseDate', sortVariation] as OrderItem);
        break;
      default:
        orderByClause.push(['releaseDate', sortVariation] as OrderItem);
        break;
    }
  }

  return orderByClause;
};

class GameController {
  async create(req: Request, res: Response) {
    const record = await createGame({ ...req.body });
    return res.status(StatusCodes.CREATED).json(record);
  }

  async getAll(req: Request, res: Response) {
    const records = await getAllGames();

    return res.status(StatusCodes.OK).json(records);
  }

  async readPagination(req: Request, res: Response) {
    const genres = req.query.genres as string;
    const features = req.query.features as string;
    const name = req.query.name as string;
    const sortBy = req.query.sortBy as string;
    const page = (req.query.page as string | undefined) || '1';
    const pageSize = (req.query.pageSize as string | undefined) || '8';
    const sortVariation = (req.query.sortVariation as string | undefined) || 'DESC';

    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);

    const whereClause = { ...generateGamesFilterObject(genres, features, name) };

    const orderByClause = generateGamesSortObject(sortBy, sortVariation);

    console.log((pageNumber - 1) * pageSizeNumber);
    console.log(pageSizeNumber);

    const result = await findGames({
      where: whereClause,
      order: orderByClause,
      offset: (pageNumber - 1) * pageSizeNumber,
      limit: pageSizeNumber,
    });

    return res.status(StatusCodes.OK).json({
      games: result.rows,
      totalItems: result.count,
      currentPage: pageNumber,
      pageSize: pageSizeNumber,
    });
  }

  async readByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGame(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    return res.status(StatusCodes.OK).json(record);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGame(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const updatedRecord = await updateGame(parseInt(id, 10), { ...req.body });

    return res.status(StatusCodes.OK).json(updatedRecord);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const record = await getGame(parseInt(id, 10));

    if (!record) {
      return next(createError(StatusCodes.NOT_FOUND, 'The record with this ID does not exist'));
    }

    const deletedRecord = await deleteGame(parseInt(id, 10));

    return res.json(deletedRecord);
  }
}

export default new GameController();
