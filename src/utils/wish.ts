import { Wish } from '../types/wish';

export const getFulfilledWishes = (wishes: Wish[]) =>
  wishes.filter(({ fulfilled }) => fulfilled);
