import { ComponentPropsWithoutRef } from 'react';
import { Check, X } from 'react-feather';
import clsx from 'clsx';
import { useDelayedUnmount } from '../../hooks/useDelayedUnmount';

type NotificationProps = Omit<ComponentPropsWithoutRef<'div'>, 'id'> & {
  type: 'error' | 'success';
  id: number;
  duration?: number;
  onDismiss: (id: number) => void;
};

const iconTypeClassNames = {
  error: 'bg-red-500 dark:bg-red-800',
  success: 'bg-green-500 dark:bg-green-800',
};
const notificationIcon = {
  error: X,
  success: Check,
};
export const Notification = ({
  type,
  children,
  className,
  id,
  duration = 5000,
  onDismiss,
  ...props
}: NotificationProps) => {
  const { open, setOpen } = useDelayedUnmount({ isMounted: false, delayTime: duration });

  const handleClose = () => {
    setOpen(false);
  };

  const handleEndCapture = () => {
    if (!open) {
      onDismiss(id);
    }
  };

  const Icon = notificationIcon[type];
  return (
    <div
      {...props}
      className={clsx(
        'flex items-center w-full max-w-sm p-4 text-black bg-white rounded-lg shadow dark:text-white dark:bg-gray-800 opacity-0 transition-transform border border-gray-200 dark:border-gray-700 ',
        open ? 'animate-fade-in-left' : 'animate-fade-out-right',
        className,
      )}
      onAnimationEndCapture={handleEndCapture}
      onTransitionEndCapture={handleEndCapture}
      role="alert"
    >
      <div
        className={clsx(
          'inline-flex items-center self-start justify-center flex-shrink-0 w-5 h-5 rounded-full text-white dark:text-gray-800',
          iconTypeClassNames[type],
        )}
      >
        <Icon className="w-4 h-4 stroke-[3px]" />
      </div>
      <div className="ml-3 text-sm font-normal">{children}</div>
      {type !== 'error' && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 flex-shrink-0 self-start bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
