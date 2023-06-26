import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type CardProps = ComponentPropsWithoutRef<'div'>;
export const Card = ({ className, ...rest }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 bg-white dark:bg-gray-700 p-2 rounded-md shadow-md shadow-gray-800 text-black dark:text-white',
        className,
      )}
      {...rest}
    />
  );
};
