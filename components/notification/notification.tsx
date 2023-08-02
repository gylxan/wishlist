import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Check, X } from 'react-feather';
import clsx from 'clsx';

type NotificationProps = Omit<ComponentPropsWithoutRef<'div'>, 'id'> & {
  type: 'error' | 'success';
  id: number;
  duration?: number;
  onDismiss: (id: number) => void;
};

const typeClassNames = {
  error: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
  success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
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
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setOpen(false);
    }, duration);
  }, [id, duration]);

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
        'flex items-center w-full max-w-sm p-4 text-black bg-white rounded-lg shadow dark:text-white dark:bg-gray-900 opacity-0 transition-transform',
        open ? 'animate-fade-in-left' : 'animate-fade-out-right',
        className,
      )}
      onAnimationEndCapture={handleEndCapture}
      onTransitionEndCapture={handleEndCapture}
      role="alert"
    >
      <div
        className={clsx(
          'inline-flex items-center self-start justify-center flex-shrink-0 w-5 h-5 rounded-full',
          typeClassNames[type],
        )}
      >
        <Icon className="w-3 h-3" />
      </div>
      <div className="ml-3 text-sm font-normal">{children}</div>
      {type !== 'error' && (
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 flex-shrink-0 self-start bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-900 dark:hover:bg-gray-700"
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
