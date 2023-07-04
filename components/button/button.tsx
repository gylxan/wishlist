import React, { ButtonHTMLAttributes, ComponentProps, ComponentPropsWithoutRef } from "react";
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

const variantClasses = {
  primary: `bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold disabled:bg-blue-500`,
  outline: `bg-transparent hover:bg-blue-500 active:bg-blue-900 text-blue-700 dark:text-white font-semibold hover:text-white border border-blue-500 hover:border-transparent disabled:bg-transparent`,
} as const;

const sizeClasses = {
  sm: `py-1 px-2 text-sm`,
  md: `py-2 px-4 text-md`,
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
    'rounded transition-colors duration-200 inline-block disabled:cursor-not-allowed disabled:opacity-60',
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
