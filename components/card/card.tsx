import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type CardProps = ComponentPropsWithoutRef<'div'>;
export const Card = ({ className, ...rest }: CardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white p-2 text-black shadow dark:border-gray-700 dark:bg-gray-800 dark:text-white',
        className,
      )}
      {...rest}
    />
  );
};
