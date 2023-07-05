import { ComponentProps } from 'react';
import clsx from 'clsx';

type FormErrorMessageProps = ComponentProps<'span'>;
export const FormErrorMessage = ({ className, ...props }: FormErrorMessageProps) => {
  return <span {...props} className={clsx('text-sm text-red-600', className)} />;
};
