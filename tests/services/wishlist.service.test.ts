import {
  createWishlist,
  removeWishlist,
  getIsInWishlist,
  getAllWishlist,
  getWishlist,
  userSignup,
  createGenre,
  createFeature,
  createPublisher,
  createDeveloper,
  createGame,
} from '../../services';
import db from '../../config/database.config';

describe('Wishlist Services', () => {
  let createdRecordID: number | undefined;
  let createdUserInstanceId: number | undefined;
  let createdGameInstanceId: number | undefined;
  let createdGenreInstanceId: number | undefined;
  let createdFeatureInstanceId: number | undefined;
  let createdDeveloperInstanceId: number | undefined;
  let createdPublisherInstanceId: number | undefined;

  beforeAll(async () => {
    await db.sync({
      logging: false,
    });

    // Create User
    const createdUser = await userSignup({
      username: 'wishlist_service1',
      email: 'wishlist_service1@gmail.com',
      password: 'wishlist_service1',
    });
    createdUserInstanceId = createdUser.getDataValue('id');

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

    // Create Game
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
    createdGameInstanceId = newGame.getDataValue('id');
  });

  test(`Create Wishlist Function`, async () => {
    const wishlistData = {
      UserInstanceId: createdUserInstanceId!,
      GameInstanceId: createdGameInstanceId!,
    };

    const newWishlist = await createWishlist(wishlistData);

    createdRecordID = newWishlist?.getDataValue('id');

    expect(newWishlist.getDataValue('UserInstanceId')).toEqual(wishlistData.UserInstanceId);
    expect(newWishlist.getDataValue('GameInstanceId')).toEqual(wishlistData.GameInstanceId);
  });

  test(`Get All Wishlist Function`, async () => {
    const wishlists = await getAllWishlist(createdUserInstanceId!);

    expect(wishlists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          UserInstanceId: expect.any(Number),
          GameInstanceId: expect.any(Number),
        }),
      ])
    );
  });

  test(`Get Wishlist By Id Function`, async () => {
    const wishlist = await getWishlist(createdRecordID!);

    expect(wishlist).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        UserInstanceId: expect.any(Number),
        GameInstanceId: expect.any(Number),
      })
    );
  });

  test(`Check Is In Wishlist Function`, async () => {
    const wishlist = await getIsInWishlist(createdUserInstanceId!, createdGameInstanceId!);

    expect(wishlist).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        UserInstanceId: expect.any(Number),
        GameInstanceId: expect.any(Number),
      })
    );
  });

  test(`Delete Wishlist Function`, async () => {
    const deletedWishlist = await removeWishlist(createdRecordID!);

    expect(deletedWishlist?.getDataValue('id')).toEqual(createdRecordID);
  });
});
