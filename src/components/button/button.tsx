import { ButtonHTMLAttributes, HTMLProps } from 'react';
import clsx from 'clsx';

const variantClasses = {
  primary: `bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white font-bold disabled:bg-blue-500`,
  outline: `bg-transparent hover:bg-blue-500 active:bg-blue-900 text-blue-700 dark:text-white font-semibold hover:text-white border border-blue-500 hover:border-transparent disabled:bg-transparent`,
} as const;

type Variant = keyof typeof variantClasses;

export type ButtonProps = HTMLProps<HTMLButtonElement | HTMLAnchorElement> & {
  variant?: Variant;
};
export const Button = ({
  children,
  variant = 'primary',
  className,
  ...otherProps
}: ButtonProps) => {
  const classNames = clsx(
    variantClasses[variant],
    'py-2 px-4 rounded transition-colors duration-200 inline-block disabled:cursor-not-allowed disabled:opacity-60',
    className,
  );
  if ('href' in otherProps) {
    return (
      <a className={classNames} {...(otherProps as HTMLProps<HTMLAnchorElement>)}>
        {children}
      </a>
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
