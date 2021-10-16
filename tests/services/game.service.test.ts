import {
  findGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
  createGenre,
  createFeature,
  createPublisher,
  createDeveloper,
} from '../../services';
import db from '../../config/database.config';
import moment from 'moment';

describe('Games Services', () => {
  let createdRecordID: number | undefined;
  let createdGenreID: number | undefined;
  let createdFeatureID: number | undefined;
  let createdDeveloperID: number | undefined;
  let createdPublisherID: number | undefined;

  beforeAll(async () => {
    await db.sync({
      logging: false,
    });

    // Create Genre
    const newGenre = await createGenre({
      genreName: 'Test Genre 1',
    });
    createdGenreID = newGenre?.getDataValue('id');

    // Create Feature
    const newFeature = await createFeature({
      featureName: 'Test Feature 1',
    });
    createdFeatureID = newFeature?.getDataValue('id');

    // Create Publisher
    const newPublisher = await createPublisher({
      publisherName: 'Test Publisher 1',
    });
    createdPublisherID = newPublisher?.getDataValue('id');

    // Create Developer
    const newDeveloper = await createDeveloper({
      developerName: 'Test Developer 1',
    });
    createdDeveloperID = newDeveloper?.getDataValue('id');
  });

  test(`Create Game Function`, async () => {
    const gameData = {
      gameName: 'Test Game 1',
      gamePoster: 'Test Game 1',
      gameTrailer: 'Test Game 1',
      gameDescription: 'Test Game 1',
      releaseDate: '2021-09-11',
      publisherId: createdPublisherID!,
      developerId: createdDeveloperID!,
      featureId: createdFeatureID!,
      genreId: createdGenreID!,
    };

    const newGame = await createGame(gameData);

    createdRecordID = newGame?.getDataValue('id');

    expect(newGame.getDataValue('gameName')).toEqual(gameData.gameName);
    expect(newGame.getDataValue('gamePoster')).toEqual(gameData.gamePoster);
    expect(newGame.getDataValue('gameTrailer')).toEqual(gameData.gameTrailer);
    expect(newGame.getDataValue('gameDescription')).toEqual(gameData.gameDescription);
    expect(moment(newGame.getDataValue('releaseDate')).format('YYYY-MM-DD')).toEqual(
      gameData.releaseDate
    );
    expect(newGame.getDataValue('publisherId')).toEqual(gameData.publisherId);
    expect(newGame.getDataValue('developerId')).toEqual(gameData.developerId);
    expect(newGame.getDataValue('featureId')).toEqual(gameData.featureId);
    expect(newGame.getDataValue('genreId')).toEqual(gameData.genreId);
  });

  test(`Get All Games Function`, async () => {
    const games = await findGames();

    expect(games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          gameName: expect.any(String),
          gamePoster: expect.any(String),
          gameTrailer: expect.any(String),
          gameDescription: expect.any(String),
          releaseDate: expect.any(Date),
          publisherId: expect.any(Number),
          featureId: expect.any(Number),
          developerId: expect.any(Number),
          genreId: expect.any(Number),
        }),
      ])
    );
  });

  test(`Get Game By Id Function`, async () => {
    const game = await getGame(createdRecordID!);

    expect(game).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        gameName: expect.any(String),
        gamePoster: expect.any(String),
        gameTrailer: expect.any(String),
        gameDescription: expect.any(String),
        releaseDate: expect.any(Date),
        publisherId: expect.any(Number),
        featureId: expect.any(Number),
        developerId: expect.any(Number),
        genreId: expect.any(Number),
      })
    );
  });

  test(`Update Game Function`, async () => {
    const modifiedGameData = {
      gameName: 'Test Game 123',
      gamePoster: 'Test Game 123',
      gameTrailer: 'Test Game 123',
      gameDescription: 'Test Game 123',
      releaseDate: '2021-09-12',
      publisherId: createdPublisherID!,
      developerId: createdDeveloperID!,
      featureId: createdFeatureID!,
      genreId: createdGenreID!,
    };

    const updatedGame = await updateGame(createdRecordID!, modifiedGameData);

    expect(updatedGame?.getDataValue('gameName')).toEqual(modifiedGameData.gameName);
    expect(updatedGame?.getDataValue('gamePoster')).toEqual(modifiedGameData.gamePoster);
    expect(updatedGame?.getDataValue('gameTrailer')).toEqual(modifiedGameData.gameTrailer);
    expect(updatedGame?.getDataValue('gameDescription')).toEqual(modifiedGameData.gameDescription);
    expect(moment(updatedGame?.getDataValue('releaseDate')).format('YYYY-MM-DD')).toEqual(
      modifiedGameData.releaseDate
    );
    expect(updatedGame?.getDataValue('publisherId')).toEqual(modifiedGameData.publisherId);
    expect(updatedGame?.getDataValue('developerId')).toEqual(modifiedGameData.developerId);
    expect(updatedGame?.getDataValue('featureId')).toEqual(modifiedGameData.featureId);
    expect(updatedGame?.getDataValue('genreId')).toEqual(modifiedGameData.genreId);
  });

  test(`Delete Game Function`, async () => {
    const deletedGame = await deleteGame(createdRecordID!);

    expect(deletedGame?.getDataValue('id')).toEqual(createdRecordID);
  });
});
