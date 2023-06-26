import { WishCard } from '../../components/wish-card/wish-card';
import { Wishlist } from '../../components/wishlist/wishlist';
import { User, Star, Calendar } from 'react-feather';
import { Card } from '../../components/card/card';
import { useWishlist } from '../../context/wishlist';
import { getFulfilledWishes } from '../../utils/wish';
import { useState } from 'react';
import { Button } from '../../components/button/button';
import { getDifferenceInDays, getFormattedDate, getParsedDate } from '../../types/date';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const fulfilledWishes = getFulfilledWishes(wishlist);
  const [showFulfilled, setShowFulfilled] = useState(false);

  const dateUntil = import.meta.env.VITE_DATE
    ? getParsedDate(import.meta.env.VITE_DATE)
    : null;
  const differenceInDays = dateUntil ? getDifferenceInDays(new Date(), dateUntil) : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <span className="text-3xl font-bold">Endlich es es so weit! 🎉</span>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <span className="flex flex-row items-center gap-2">
            <User /> {import.meta.env.VITE_NAME}
          </span>
          <span className="flex flex-row items-center gap-2">
            <Star /> {import.meta.env.VITE_REASON}
          </span>
          {dateUntil && (
            <span className="flex flex-row items-center gap-2">
              <Calendar /> {getFormattedDate(dateUntil)} (in {differenceInDays}{' '}
              {differenceInDays === 1 ? 'Tag' : 'Tagen'})
            </span>
          )}
        </div>
        <p className="my-6 text-center">{import.meta.env.VITE_DESCRIPTION}</p>
        <div className="text-gray-500 flex justify-between w-full dark:text-gray-300">
          <span>
            {fulfilledWishes.length} / {wishlist.length} Wünschen erfüllt
          </span>
          <Button variant="outline" onClick={() => setShowFulfilled(!showFulfilled)}>
            {showFulfilled ? 'Erfüllte ausblenden' : 'Erfüllte anzeigen'}
          </Button>
        </div>
      </Card>
      <Wishlist>
        {wishlist
          .filter(({ fulfilled }) => (showFulfilled ? true : !fulfilled))
          .map((entry) => (
            <WishCard key={entry.title} {...entry} />
          ))}
      </Wishlist>
    </div>
  );
};
