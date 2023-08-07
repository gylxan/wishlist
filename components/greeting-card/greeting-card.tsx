import { Calendar, Star, User } from 'react-feather';
import { getDifferenceInDays, getFormattedDate, getParsedDate } from '../../types/date';
import { Button } from '../button/button';
import { Card } from '../card/card';
import React from 'react';
import { Wish } from '../../types/wish';
import { getFulfilledWishes } from '../../utils/wish';

type GreetingCardProps = {
  wishes: Wish[];
  showFulfilledWishes: boolean;
  onShowFulfilledWishes: () => void;
};
export const GreetingCard = ({
  wishes,
  showFulfilledWishes,
  onShowFulfilledWishes,
}: GreetingCardProps) => {
  const fulfilledWishes = getFulfilledWishes(wishes ?? []);
  const dateUntil = process.env.NEXT_PUBLIC_DATE
    ? getParsedDate(process.env.NEXT_PUBLIC_DATE)
    : null;
  const differenceInDays = dateUntil ? getDifferenceInDays(new Date(), dateUntil) : 0;

  return (
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
        <Button
          variant="outline"
          onClick={onShowFulfilledWishes}
          disabled={!fulfilledWishes.length}
        >
          {showFulfilledWishes ? 'Erfüllte ausblenden' : 'Erfüllte anzeigen'}
        </Button>
      </div>
    </Card>
  );
};
