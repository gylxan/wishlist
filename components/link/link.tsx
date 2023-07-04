import { AnchorHTMLAttributes, ReactNode, RefAttributes } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
> &
  NextLinkProps & {
    children?: ReactNode;
  } & RefAttributes<HTMLAnchorElement>;

export const Link = ({ className, ...props }: LinkProps) => {
  return <NextLink {...props} className={clsx('underline', className)} />;
};
