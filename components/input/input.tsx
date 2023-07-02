import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = ComponentPropsWithoutRef<'input'>;
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    return (
      <input className={clsx('rounded-sm px-2 py-1', className)} {...props} ref={ref} />
    );
  },
);

Input.displayName = 'Input';
