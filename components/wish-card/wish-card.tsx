import { Button } from '../button/button';
import { ExternalLink } from 'react-feather';
import { Card } from '../card/card';
import { Wish } from '../../types/wish';
import clsx from 'clsx';
import { isUserLocalUser } from '../../utils/user';
import { useUserContext } from '../../context/user';
import { Spinner } from '../spinner/spinner';

type WishCardProps = {
  wish: Wish;
  onFulfill: (wish: Wish) => Promise<void>;
  onReject: (wish: Wish) => Promise<void>;
  loading: boolean;
};

export const WishCard = ({ wish, onFulfill, onReject, loading }: WishCardProps) => {
  const { url, title, description, imageUrl, giver } = wish;
  const newUrl = url ? new URL(url) : undefined;
  const urlWithoutWww = newUrl?.hostname.replace('www.', '');
  const { username } = useUserContext();

  const hasGiver = !!giver;
  const isGiverLocalUser = isUserLocalUser(giver ?? null, username);

  const handleClick = async () => {
    await (hasGiver && isGiverLocalUser ? onReject(wish) : onFulfill(wish));
  };

  const getGiverClass = (className?: string) => clsx(className, giver && 'opacity-60');

  return (
    <Card className={clsx(giver && 'bg-gray-200 dark:bg-gray-600')}>
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

      <div className="flex w-full flex-col items-center gap-3 text-center justify-start">
        {imageUrl && (
          <img src={imageUrl} alt={`Product ${title}`} className={getGiverClass()} />
        )}
        {description && <p className="italic">&quot;{description}&quot;</p>}
      </div>
      <div className="flex w-full flex-col items-center gap-3 text-center mt-auto">
        <p className={getGiverClass('min-h-[1.5em]')}>
          {giver ? `Erfüllt von ${giver}` : ' '}
        </p>
        <hr
          className={getGiverClass(
            'flex-c h-[1px] w-full border-0 bg-gray-600 dark:bg-gray-300',
          )}
        />
        <div className="flex w-full justify-between gap-2">
          <Button
            disabled={(hasGiver && !isGiverLocalUser) || loading}
            onClick={handleClick}
          >
            {loading && <Spinner size="sm" color="white" className="mr-2" />}
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
