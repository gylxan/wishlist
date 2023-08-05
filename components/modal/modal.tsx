import { createPortal } from 'react-dom';
import { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { X } from 'react-feather';

type ModalProps = {
  children: ReactNode;
  open: boolean;
};
export const Modal = ({ children, open: openProp }: ModalProps) => {
  const [open, setOpen] = useState(openProp);

  // todo create new hook
  useEffect(() => {
    if (!openProp && open) {
      const timeout = setTimeout(() => {
        setOpen(false);
        clearTimeout(timeout);
      }, 500);
    } else if (openProp && !open) {
      setOpen(true);
    }
  }, [openProp, open]);

  const modal = open ? (
    <div
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex backdrop-blur-lg"
    >
      <div className="relative w-full max-w-2xl max-h-full m-auto">
        <div
          role="dialog"
          className={clsx(
            'relative bg-white rounded-lg shadow dark:bg-gray-800',
            openProp ? 'ease-bounce-in animate-bounce-in' : 'animate-bounce-out',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;

  if (typeof document !== 'undefined') {
    const element = document.getElementById('modal');
    return element ? createPortal(modal, element) : null;
  }
  return null;
};

type ModalHeaderProps = {
  children: ReactNode;
};
export const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
      {children}
    </div>
  );
};

type ModalTitleProps = {
  children: ReactNode;
};
export const ModalTitle = ({ children }: ModalTitleProps) => {
  return (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{children}</h3>
  );
};

type ModalBodyProps = {
  children: ReactNode;
};
export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="p-6 space-y-6">{children}</div>;
};

type ModalFooterProps = ComponentPropsWithoutRef<'div'>;

export const ModalFooter = ({ className, children, ...props }: ModalFooterProps) => {
  return (
    <div
      className={clsx(
        'flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type ModalCloseButtonProps = ComponentPropsWithoutRef<'button'>;
export const ModalCloseButton = (props: ModalCloseButtonProps) => {
  return (
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="defaultModal"
      {...props}
    >
      <X className="w-5 h-5" />
      <span className="sr-only">Dialog schließen</span>
    </button>
  );
};
