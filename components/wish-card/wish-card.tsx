import { Button } from '../button/button';
import { ExternalLink } from 'react-feather';
import { Card } from '../card/card';
import { Wish } from '../../types/wish';
import clsx from 'clsx';

type WishCardProps = Wish & {
  onFulfill: () => void;
};

export const WishCard = ({ url, title, imageUrl, giver, onFulfill }: WishCardProps) => {
  const newUrl = url ? new URL(url) : undefined;
  const urlWithoutWww = newUrl?.hostname.replace('www.', '');

  return (
    <Card className={clsx(giver && 'opacity-60')}>
      <h2 className="text-xl font-bold text-black dark:text-white">{title}</h2>
      <hr className="h-[1px] w-full border-0 bg-gray-600 dark:bg-gray-300" />
      {urlWithoutWww && (
        <p className="text-sm text-gray-400 dark:text-gray-300">{urlWithoutWww}</p>
      )}

      {imageUrl && <img src={imageUrl} alt={`Product ${title}`} />}
      <p className="min-h-[1.5em]">{giver ? `Erfüllt von ${giver}` : ' '}</p>
      <hr className="flex-c h-[1px] w-full border-0 bg-gray-600 dark:bg-gray-300" />
      <div className="flex w-full justify-between">
        <Button disabled={!!giver} onClick={onFulfill}>
          Erfüllen
        </Button>
        {!!url && (
          <Button
            variant="outline"
            href={url}
            target="_blank"
            className="flex items-center"
          >
            Zum Produkt <ExternalLink className="h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};
