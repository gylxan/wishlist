import { Button } from '../button/button';
import { ExternalLink } from 'react-feather';
import { Card } from '../card/card';
import { Wish } from '../../types/wish';
import clsx from 'clsx';

type WishCardProps = Wish;

export const WishCard = ({ url, title, imageUrl, fulfilled }: WishCardProps) => {
  const newUrl = url ? new URL(url) : undefined;
  const urlWithoutWww = newUrl?.hostname.replace('www.', '');
  return (
    <Card className={clsx(fulfilled && 'opacity-60')}>
      <h2 className="font-bold text-xl text-black dark:text-white">{title}</h2>
      <hr className="w-full h-[1px] border-0 bg-gray-600 dark:bg-gray-300" />
      {urlWithoutWww && (
        <p className="text-sm text-gray-400 dark:text-gray-300">{urlWithoutWww}</p>
      )}

      {imageUrl && <img src={imageUrl} alt={`Product ${title}`} />}
      <hr className="w-full flex-c h-[1px] border-0 bg-gray-600 dark:bg-gray-300" />
      <div className="flex items-stjustify-between w-full">
        <Button disabled={fulfilled}>Erfüllen</Button>
        <Button
          variant="outline"
          href={url}
          target="_blank"
          className="flex items-center"
        >
          Zum Produkt <ExternalLink className="h-4" />
        </Button>
      </div>
    </Card>
  );
};
