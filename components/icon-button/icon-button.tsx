import React, { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const IconButton = ({ children, className, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex flex-grow-0 items-center rounded-full border border-blue-700 p-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800',
        className,
      )}
      type="button"
      {...otherProps}
    >
      {children}
    </button>
  );
};
