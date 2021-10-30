import {
  OrderAttributes,
  OrderInstance,
  GameInstance,
  DeveloperInstance,
  PublisherInstance,
  UserInstance,
} from '../models';

export const getAllOrders = async (): Promise<OrderInstance[]> => {
  const orders = await OrderInstance.findAll({
    include: [
      {
        model: UserInstance,
      },
      {
        model: GameInstance,
        include: [DeveloperInstance, PublisherInstance],
      },
    ],
  });

  return orders;
};

export const getIsInLibrary = async (
  userId: number,
  gameId: number
): Promise<OrderInstance | null> => {
  const order = await OrderInstance.findOne({
    where: {
      UserInstanceId: userId,
      GameInstanceId: gameId,
    },
  });

  return order;
};

export const getOrdersForLibrary = async (userId: number): Promise<OrderInstance[]> => {
  const orders = await OrderInstance.findAll({
    where: {
      UserInstanceId: userId,
    },
    include: [
      {
        model: GameInstance,
        include: [DeveloperInstance, PublisherInstance],
      },
    ],
  });

  return orders;
};

export const createOrder = async (newOrder: OrderAttributes): Promise<OrderInstance> => {
  const createdOrder = await OrderInstance.create(newOrder);

  return createdOrder;
};
