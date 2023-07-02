import { WishCard } from '../components/wish-card/wish-card';
import { Wishlist } from '../components/wishlist/wishlist';
import { Calendar, Star, User } from 'react-feather';
import { Card } from '../components/card/card';
import { getFulfilledWishes } from '../utils/wish';
import { useState } from 'react';
import { Button } from '../components/button/button';
import { getDifferenceInDays, getFormattedDate, getParsedDate } from '../types/date';
import { GetStaticProps } from 'next';
import { Wish } from '../types/wish';
import Link from 'next/link';
import prisma from '../utils/prisma';
import { doApiCall } from '../utils/api';
import { getSessionStorageItem, setSessionStorageItem } from '../utils/session-storage';

type WishlistPageProps = {
  wishes?: Wish[];
};
const WishlistPage = ({ wishes: wishesProp }: WishlistPageProps) => {
  const [wishes, setWishes] = useState(wishesProp);
  const fulfilledWishes = getFulfilledWishes(wishes ?? []);
  const [showFulfilled, setShowFulfilled] = useState(
    getSessionStorageItem('show_fulfilled') === 'true',
  );

  const handleUpdate = async (id: number, name: string | null) => {
    if (name !== null && name.trim() !== '') {
      const response = await doApiCall(`/wish/${id}`, 'PUT', {
        giver: name,
      });
      const updatedWish = await response.json();
      setWishes((wishes) =>
        wishes?.map((wish) => (wish.id === updatedWish.id ? updatedWish : wish)),
      );
    }
  };

  const dateUntil = process.env.NEXT_PUBLIC_DATE
    ? getParsedDate(process.env.NEXT_PUBLIC_DATE)
    : null;
  const differenceInDays = dateUntil ? getDifferenceInDays(new Date(), dateUntil) : 0;

  return (
    <div className="relative flex flex-col gap-4 pb-20">
      <Card>
        <span className="text-3xl font-bold">Endlich es es so weit! 🎉</span>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <span className="flex flex-row items-center gap-2">
            <User /> {process.env.NEXT_PUBLIC_NAME}
          </span>
          <span className="flex flex-row items-center gap-2">
            <Star /> {process.env.NEXT_PUBLIC_REASON}
          </span>
          {dateUntil && (
            <span className="flex flex-row items-center gap-2">
              <Calendar /> {getFormattedDate(dateUntil)} (in {differenceInDays}{' '}
              {differenceInDays === 1 ? 'Tag' : 'Tagen'})
            </span>
          )}
        </div>
        <p className="my-6 text-center">{process.env.NEXT_PUBLIC_DESCRIPTION}</p>
        <div className="flex w-full justify-between text-gray-500 dark:text-gray-300">
          <span>
            {fulfilledWishes.length} / {wishes?.length} Wünschen erfüllt
          </span>
          {fulfilledWishes.length > 0 && (
            <Button
              variant="outline"
              onClick={() => {
                setShowFulfilled(!showFulfilled);
                setSessionStorageItem('show_fulfilled', `${!showFulfilled}`);
              }}
            >
              {showFulfilled ? 'Erfüllte ausblenden' : 'Erfüllte anzeigen'}
            </Button>
          )}
        </div>
      </Card>
      <Wishlist>
        {wishes
          ?.filter(({ giver }) => (showFulfilled ? true : !giver))
          .map((entry) => (
            <WishCard
              key={entry.title}
              {...entry}
              onFulfill={() => {
                if (!entry.giver && entry.id) {
                  const name = prompt('Gib uns doch bitte deinen Namen');
                  handleUpdate(entry.id, name);
                }
              }}
            />
          ))}
      </Wishlist>
      <div className="absolute bottom-0 right-0">
        Hier geht&apos;s zum <Link href="/admin">Admin-Bereich</Link>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<WishlistPageProps> = async () => {
  const wishes = await prisma.wish.findMany();

  return { props: { wishes }, revalidate: 10 };
};

export default WishlistPage;
