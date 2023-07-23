import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

type TextareaProps = ComponentPropsWithoutRef<'textarea'>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }: TextareaProps, ref) => {
    return (
      <textarea
        className={clsx(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
