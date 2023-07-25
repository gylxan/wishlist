import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

const variantClasses = {
  primary: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`,
  outline: `text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`,
} as const;

const sizeClasses = {
  sm: `py-1 px-2 text-xs`,
  md: `py-2.5 px-5 text-sm`,
} as const;

type Variant = keyof typeof variantClasses;
type Size = keyof typeof sizeClasses;

type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & LinkProps;

export type ButtonProps = (ComponentPropsWithoutRef<'button'> | ButtonLinkProps) & {
  variant?: Variant;
  size?: Size;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...otherProps
}: ButtonProps) => {
  const classNames = clsx(
    variantClasses[variant],
    sizeClasses[size],
    'rounded transition-colors duration-200 inline-flex gap-1 items-center disabled:cursor-not-allowed disabled:opacity-60',
    className,
  );
  if ('href' in otherProps) {
    return (
      <Link className={classNames} {...(otherProps as ButtonLinkProps)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={classNames}
      {...(otherProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
