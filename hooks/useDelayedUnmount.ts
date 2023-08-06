import { useCallback, useEffect, useState } from 'react';

type UseDelayedUnmountProps = {
  initialMount?: boolean;
  isMounted?: boolean;
  delayTime?: number;
  onUnmount?: () => void;
};
export const useDelayedUnmount = ({
  initialMount = true,
  isMounted = false,
  delayTime = 500,
  onUnmount,
}: UseDelayedUnmountProps = {}) => {
  const [open, setOpen] = useState(initialMount);

  const handleUnmount = useCallback(() => onUnmount?.(), [onUnmount]);

  useEffect(() => {
    let timeoutId: number;
    if (isMounted && !open) {
      setOpen(true);
    } else if (!isMounted && open) {
      timeoutId = window.setTimeout(() => {
        setOpen(false);
        handleUnmount?.();
        clearTimeout(timeoutId);
      }, delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, open, handleUnmount]);

  return { open, setOpen };
};
