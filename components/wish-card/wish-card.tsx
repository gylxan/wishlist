import { Button } from '../button/button';
import { ExternalLink } from 'react-feather';
import { Card } from '../card/card';
import { Wish } from '../../types/wish';
import clsx from 'clsx';
import { isUserLocalUser } from '../../utils/user';
import { useUserContext } from '../../context/user';

type WishCardProps = {
  wish: Wish;
  onFulfill: (wish: Wish) => void;
  onReject: (wish: Wish) => void;
};

export const WishCard = ({ wish, onFulfill, onReject }: WishCardProps) => {
  const { url, title, description, imageUrl, giver } = wish;
  const newUrl = url ? new URL(url) : undefined;
  const urlWithoutWww = newUrl?.hostname.replace('www.', '');
  const { username } = useUserContext();

  const hasGiver = !!giver;
  const isGiverLocalUser = isUserLocalUser(giver ?? null, username);

  const handleClick = () => {
    hasGiver && isGiverLocalUser ? onReject(wish) : onFulfill(wish);
  };

  const getGiverClass = (className?: string) => clsx(className, giver && 'opacity-60');

  return (
    <Card className={clsx('justify-between', giver && 'bg-gray-200 dark:bg-gray-600')}>
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h2 className={getGiverClass('text-xl font-bold text-black dark:text-white')}>
          {title}
        </h2>
        <hr
          className={getGiverClass(
            'h-[1px] w-full border-0 bg-gray-600 dark:bg-gray-300',
          )}
        />
        {urlWithoutWww && (
          <p className="text-sm text-gray-400 dark:text-gray-300">{urlWithoutWww}</p>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-3 text-center">
        {imageUrl && (
          <img src={imageUrl} alt={`Product ${title}`} className={getGiverClass()} />
        )}
        {description && <p className="italic">&quot;{description}&quot;</p>}
      </div>
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <p className={getGiverClass('min-h-[1.5em]')}>
          {giver ? `Erfüllt von ${giver}` : ' '}
        </p>
        <hr
          className={getGiverClass(
            'flex-c h-[1px] w-full border-0 bg-gray-600 dark:bg-gray-300',
          )}
        />
        <div className="flex w-full justify-between">
          <Button disabled={hasGiver && !isGiverLocalUser} onClick={handleClick}>
            {hasGiver && isGiverLocalUser ? 'Nicht mehr erfüllen' : 'Erfüllen'}
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
      </div>
    </Card>
  );
};
