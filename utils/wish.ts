import { Wish } from '../types/wish';

export const getFulfilledWishes = (wishes: Wish[]) =>
  wishes.filter(({ giver }) => !!giver);

export const getShortenedWishUrl = ({ url }: Wish) => {
  const newUrl = url ? new URL(url) : undefined;
  return newUrl?.hostname.replace('www.', '');
};
