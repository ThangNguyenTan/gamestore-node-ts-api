import {
  GameInstance,
  GameAttributes,
  FeatureInstance,
  GenreInstance,
  DeveloperInstance,
  PublisherInstance,
} from '../models';
import { FindOptions } from 'sequelize';

export const getAllGames = async (): Promise<GameInstance[]> => {
  const games = await GameInstance.findAll();

  return games;
};

export const findGames = async (
  options?: FindOptions<GameAttributes>
): Promise<{ rows: GameInstance[]; count: number }> => {
  const games = await GameInstance.findAndCountAll({
    ...options,
    include: [FeatureInstance, GenreInstance, DeveloperInstance, PublisherInstance],
  });

  return games;
};

export const getGame = async (id: number): Promise<GameInstance | null> => {
  const game = await GameInstance.findOne({
    where: { id },
    include: [FeatureInstance, GenreInstance, DeveloperInstance, PublisherInstance],
  });

  return game;
};

export const createGame = async (newGame: GameAttributes): Promise<GameInstance> => {
  const {
    gameName,
    gamePrice,
    gamePoster,
    gameTrailer,
    gameDescription,
    releaseDate,
    PublisherInstanceId,
    DeveloperInstanceId,
    FeatureInstanceId,
    GenreInstanceId,
  } = newGame;
  const createdGame = await GameInstance.create({
    gameName,
    gamePrice,
    gamePoster,
    gameTrailer,
    gameDescription,
    releaseDate,
    PublisherInstanceId,
    DeveloperInstanceId,
    FeatureInstanceId,
    GenreInstanceId,
  });

  return createdGame;
};

export const updateGame = async (
  id: number,
  modifiedGame: GameAttributes
): Promise<GameInstance | null> => {
  let game = await getGame(id);
  const {
    gameName,
    gamePrice,
    gamePoster,
    gameTrailer,
    gameDescription,
    releaseDate,
    PublisherInstanceId,
    DeveloperInstanceId,
    FeatureInstanceId,
    GenreInstanceId,
  } = modifiedGame;

  if (!game) {
    return null;
  }

  game = await game.update({
    gameName,
    gamePrice,
    gamePoster,
    gameTrailer,
    gameDescription,
    releaseDate,
    PublisherInstanceId,
    DeveloperInstanceId,
    FeatureInstanceId,
    GenreInstanceId,
  });

  return game;
};

export const deleteGame = async (id: number): Promise<GameInstance | null> => {
  const game = await getGame(id);

  if (!game) {
    return null;
  }

  await game.destroy();

  return game;
};
