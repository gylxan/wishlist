import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = ComponentPropsWithoutRef<'input'>;
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    return (
      <input
        className={clsx(
          'focus:shadow-outline w-full appearance-none rounded border bg-gray-700 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none dark:text-gray-300',
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Input.displayName = 'Input';
