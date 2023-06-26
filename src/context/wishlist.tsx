import { createContext, useContext } from 'react';
import { Wish } from '../types/wish';

type ContextValues = {
  wishlist: Wish[];
  setWishlist: (wishlist: Wish[]) => void;
};

const WishlistContext = createContext<ContextValues>({
  wishlist: [],
  setWishlist: () => undefined,
});

export const WishlistProvider = WishlistContext.Provider;

export const useWishlist = () => {
  return useContext(WishlistContext);
};
