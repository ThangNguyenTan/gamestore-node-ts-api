import {
  DeveloperInstance,
  GameInstance,
  PublisherInstance,
  WishlistAttributes,
  WishlistInstance,
} from '../models';

export const getAllWishlist = async (userId: number): Promise<WishlistInstance[]> => {
  const wishlists = await WishlistInstance.findAll({
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

  return wishlists;
};

export const createWishlist = async (
  newWishlist: WishlistAttributes
): Promise<WishlistInstance> => {
  const createdWishlist = await WishlistInstance.create(newWishlist);

  return createdWishlist;
};

export const getWishlist = async (id: number): Promise<WishlistInstance | null> => {
  const wishlist = await WishlistInstance.findOne({ where: { id } });

  return wishlist;
};

export const removeWishlist = async (wishlistId: number): Promise<WishlistInstance | null> => {
  const wishlist = await getWishlist(wishlistId);

  if (!wishlist) {
    return null;
  }

  await wishlist.destroy();

  return wishlist;
};

export const getIsInWishlist = async (
  userId: number,
  gameId: number
): Promise<WishlistInstance | null> => {
  const wishlist = await WishlistInstance.findOne({
    where: {
      UserInstanceId: userId,
      GameInstanceId: gameId,
    },
  });

  return wishlist;
};
