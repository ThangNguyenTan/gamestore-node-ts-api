import {
  createOrder,
  getIsInLibrary,
  userSignup,
  createGenre,
  createFeature,
  createPublisher,
  createDeveloper,
  createGame,
  getOrdersForLibrary,
  getAllOrders,
} from '../../services';
import db from '../../config/database.config';

describe('Order Services', () => {
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
      username: 'order_service1',
      email: 'order_service1@gmail.com',
      password: 'order_service1',
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

  test(`Create Order Function`, async () => {
    const orderData = {
      UserInstanceId: createdUserInstanceId!,
      GameInstanceId: createdGameInstanceId!,
      total: 19.99,
      paymentId: 'aksdakjsgdkalhckjch',
    };

    const newOrder = await createOrder(orderData);

    expect(newOrder.getDataValue('UserInstanceId')).toEqual(orderData.UserInstanceId);
    expect(newOrder.getDataValue('GameInstanceId')).toEqual(orderData.GameInstanceId);
    expect(newOrder.getDataValue('total')).toEqual(orderData.total);
    expect(newOrder.getDataValue('paymentId')).toEqual(orderData.paymentId);
  });

  test(`Get Orders For Library Function`, async () => {
    const orders = await getOrdersForLibrary(createdUserInstanceId!);

    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          UserInstanceId: expect.any(Number),
          GameInstanceId: expect.any(Number),
          total: expect.any(Number),
          paymentId: expect.any(String),
        }),
      ])
    );
  });

  test(`Get All Orders`, async () => {
    const orders = await getAllOrders();

    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          UserInstanceId: expect.any(Number),
          GameInstanceId: expect.any(Number),
          total: expect.any(Number),
          paymentId: expect.any(String),
        }),
      ])
    );
  });

  test(`Check Order Is In Library Function`, async () => {
    const order = await getIsInLibrary(createdUserInstanceId!, createdGameInstanceId!);

    expect(order).toBeTruthy();
  });
});
