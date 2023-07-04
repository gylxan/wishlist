import { WishCard } from '../components/wish-card/wish-card';
import { Wishlist } from '../components/wishlist/wishlist';
import { Calendar, Star, User } from 'react-feather';
import { Card } from '../components/card/card';
import { getFulfilledWishes } from '../utils/wish';
import { useEffect, useState } from 'react';
import { Button } from '../components/button/button';
import { getDifferenceInDays, getFormattedDate, getParsedDate } from '../types/date';
import { GetServerSideProps } from 'next';
import { Wish } from '../types/wish';
import prisma from '../utils/prisma';
import { setSessionStorageItem } from '../utils/session-storage';
import useSessionStorage from '../hooks/useSessionStorage';
import { isEmpty } from '../utils/string';
import { useUserContext } from '../context/user';
import { useApi } from '../hooks/useApi';
import { Link } from '../components/link/link';

type WishlistPageProps = {
  wishes?: Wish[];
};
const WishlistPage = ({ wishes: wishesProp }: WishlistPageProps) => {
  const [wishes, setWishes] = useState(wishesProp);
  const fulfilledWishes = getFulfilledWishes(wishes ?? []);
  const { storageValue: sessionShowFulfilled } = useSessionStorage({
    key: 'show_fulfilled',
  });
  const { username, setUser } = useUserContext();
  const [showFulfilled, setShowFulfilled] = useState(sessionShowFulfilled === 'true');
  const { fetch: updateWish } = useApi<Wish>({
    url: '/wish',
    method: 'PUT',
  });

  useEffect(() => {
    setShowFulfilled(sessionShowFulfilled === 'true');
  }, [sessionShowFulfilled]);

  const handleUpdate = async (id: number, name: string | null) => {
    const updatedWish = await updateWish({ id, data: { giver: name } });

    if (updatedWish) {
      setWishes((wishes) =>
        wishes?.map((wish) => (wish.id === updatedWish?.id ? updatedWish : wish)),
      );
    }
  };

  const login = () => {
    const name = prompt('Wie ist dein Name?');

    if (!isEmpty(name)) {
      !username && setUser(name as string);
      return name;
    }
    return null;
  };

  const handleFulfill = (wish: Wish) => {
    if (!wish.giver && wish.id) {
      let name = username;

      if (!username) {
        name = login();
      }

      if (!isEmpty(name)) {
        !username && setUser(name as string);
        handleUpdate(wish.id, name);
      }
    }
  };

  const handleReject = (wish: Wish) => {
    if (wish.id) {
      handleUpdate(wish.id, null);
    }
  };

  const dateUntil = process.env.NEXT_PUBLIC_DATE
    ? getParsedDate(process.env.NEXT_PUBLIC_DATE)
    : null;
  const differenceInDays = dateUntil ? getDifferenceInDays(new Date(), dateUntil) : 0;

  return (
    <div className="relative flex min-h-screen flex-col gap-4 pb-20">
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
        <div className="flex w-full items-center justify-between text-gray-500 dark:text-gray-300">
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
          .map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              onFulfill={handleFulfill}
              onReject={handleReject}
            />
          ))}
      </Wishlist>
      <div className="mt-auto flex w-full justify-between pt-8">
        <span>
          {username ? (
            `Angemeldet als ${username}`
          ) : (
            <Button variant="outline" size="sm" onClick={login}>
              Anmelden
            </Button>
          )}
        </span>
        <span>
          Hier geht&apos;s zum <Link href="/admin">Admin-Bereich</Link>
        </span>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<WishlistPageProps> = async () => {
  const wishes = await prisma.wish.findMany();

  return { props: { wishes } };
};

export default WishlistPage;
