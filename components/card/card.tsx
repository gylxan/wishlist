import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type CardProps = ComponentPropsWithoutRef<'div'>;
export const Card = ({ className, ...rest }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 rounded-md bg-white p-2 text-black shadow-md shadow-gray-800 dark:bg-gray-700 dark:text-white',
        className,
      )}
      {...rest}
    />
  );
};
