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
  let createdGenreInstanceId: number | undefined;
  let createdFeatureInstanceId: number | undefined;
  let createdDeveloperInstanceId: number | undefined;
  let createdPublisherInstanceId: number | undefined;

  beforeAll(async () => {
    await db.sync({
      logging: false,
    });

    // Create Genre
    const newGenre = await createGenre({
      genreName: 'Test Genre 1',
    });
    createdGenreInstanceId = newGenre?.getDataValue('id');

    // Create Feature
    const newFeature = await createFeature({
      featureName: 'Test Feature 1',
    });
    createdFeatureInstanceId = newFeature?.getDataValue('id');

    // Create Publisher
    const newPublisher = await createPublisher({
      publisherName: 'Test Publisher 1',
    });
    createdPublisherInstanceId = newPublisher?.getDataValue('id');

    // Create Developer
    const newDeveloper = await createDeveloper({
      developerName: 'Test Developer 1',
    });
    createdDeveloperInstanceId = newDeveloper?.getDataValue('id');
  });

  test(`Create Game Function`, async () => {
    const gameData = {
      gameName: 'Test Game 1',
      gamePoster: 'Test Game 1',
      gameTrailer: 'Test Game 1',
      gameDescription: 'Test Game 1',
      releaseDate: '2021-09-11',
      gamePrice: 19.99,
      PublisherInstanceId: createdPublisherInstanceId!,
      DeveloperInstanceId: createdDeveloperInstanceId!,
      FeatureInstanceId: createdFeatureInstanceId!,
      GenreInstanceId: createdGenreInstanceId!,
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
    expect(newGame.getDataValue('PublisherInstanceId')).toEqual(gameData.PublisherInstanceId);
    expect(newGame.getDataValue('DeveloperInstanceId')).toEqual(gameData.DeveloperInstanceId);
    expect(newGame.getDataValue('FeatureInstanceId')).toEqual(gameData.FeatureInstanceId);
    expect(newGame.getDataValue('GenreInstanceId')).toEqual(gameData.GenreInstanceId);
  });

  test(`Get All Games Function`, async () => {
    const { rows: games } = await findGames();

    expect(games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          gameName: expect.any(String),
          gamePoster: expect.any(String),
          gameTrailer: expect.any(String),
          gameDescription: expect.any(String),
          releaseDate: expect.any(Date),
          PublisherInstanceId: expect.any(Number),
          FeatureInstanceId: expect.any(Number),
          DeveloperInstanceId: expect.any(Number),
          GenreInstanceId: expect.any(Number),
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
        PublisherInstanceId: expect.any(Number),
        FeatureInstanceId: expect.any(Number),
        DeveloperInstanceId: expect.any(Number),
        GenreInstanceId: expect.any(Number),
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
      gamePrice: 29.99,
      PublisherInstanceId: createdPublisherInstanceId!,
      DeveloperInstanceId: createdDeveloperInstanceId!,
      FeatureInstanceId: createdFeatureInstanceId!,
      GenreInstanceId: createdGenreInstanceId!,
    };

    const updatedGame = await updateGame(createdRecordID!, modifiedGameData);

    expect(updatedGame?.getDataValue('gameName')).toEqual(modifiedGameData.gameName);
    expect(updatedGame?.getDataValue('gamePoster')).toEqual(modifiedGameData.gamePoster);
    expect(updatedGame?.getDataValue('gameTrailer')).toEqual(modifiedGameData.gameTrailer);
    expect(updatedGame?.getDataValue('gameDescription')).toEqual(modifiedGameData.gameDescription);
    expect(moment(updatedGame?.getDataValue('releaseDate')).format('YYYY-MM-DD')).toEqual(
      modifiedGameData.releaseDate
    );
    expect(updatedGame?.getDataValue('PublisherInstanceId')).toEqual(
      modifiedGameData.PublisherInstanceId
    );
    expect(updatedGame?.getDataValue('DeveloperInstanceId')).toEqual(
      modifiedGameData.DeveloperInstanceId
    );
    expect(updatedGame?.getDataValue('FeatureInstanceId')).toEqual(
      modifiedGameData.FeatureInstanceId
    );
    expect(updatedGame?.getDataValue('GenreInstanceId')).toEqual(modifiedGameData.GenreInstanceId);
  });

  test(`Delete Game Function`, async () => {
    const deletedGame = await deleteGame(createdRecordID!);

    expect(deletedGame?.getDataValue('id')).toEqual(createdRecordID);
  });
});
