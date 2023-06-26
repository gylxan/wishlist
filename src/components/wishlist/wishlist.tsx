import { PropsWithChildren } from 'react';

export type WishlistProps = PropsWithChildren;
export const Wishlist = ({ children }: WishlistProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
};
