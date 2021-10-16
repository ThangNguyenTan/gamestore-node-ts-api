import { GameInstance, GameAttributes } from '../models';
import { FindOptions } from 'sequelize';

export const findGames = async (options?: FindOptions<GameAttributes>): Promise<GameInstance[]> => {
  const games = await GameInstance.findAll(options);

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
    publisherId,
    developerId,
    featureId,
    genreId,
  } = newGame;
  const createdGame = await GameInstance.create({
    gameName,
    gamePoster,
    gameTrailer,
    gameDescription,
    releaseDate,
    publisherId,
    developerId,
    featureId,
    genreId,
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
    publisherId,
    developerId,
    featureId,
    genreId,
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
    publisherId,
    developerId,
    featureId,
    genreId,
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
