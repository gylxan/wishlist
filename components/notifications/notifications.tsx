import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type NotificationsProps = ComponentPropsWithoutRef<'div'>;
export const Notifications = ({ className, ...props }: NotificationsProps) => {
  return (
    <div
      className={clsx(
        'fixed right-0 pr-4 gap-4 flex flex-col items-center w-full max-w-xs z-10 max-h-screen top-4 overflow-hidden',
        className,
      )}
      {...props}
    />
  );
};
