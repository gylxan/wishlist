import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type FormLabelProps = ComponentPropsWithoutRef<'label'> & {
  htmlFor: string;
};
export const FormLabel = ({ className, htmlFor, ...props }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      {...props}
      className={clsx(
        'mb-2 block text-sm font-bold text-gray-700 dark:text-gray-200',
        className,
      )}
    />
  );
};
