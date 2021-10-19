import {
  GameInstance,
  GameAttributes,
  FeatureInstance,
  GenreInstance,
  DeveloperInstance,
  PublisherInstance,
} from '../models';
import { FindOptions } from 'sequelize';

export const findGames = async (options?: FindOptions<GameAttributes>): Promise<GameInstance[]> => {
  const games = await GameInstance.findAll({
    ...options,
    include: [FeatureInstance, GenreInstance, DeveloperInstance, PublisherInstance],
  });

  return games;
};

export const getGame = async (id: number): Promise<GameInstance | null> => {
  const game = await GameInstance.findOne({ where: { id } });

  return game;
};

export const createGame = async (newGame: GameAttributes): Promise<GameInstance> => {
  const {
    gameName,
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
