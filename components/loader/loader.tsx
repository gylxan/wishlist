import styles from './loader.module.css';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export type LoaderProps = ComponentPropsWithoutRef<'div'>;
const Loader = ({ className, children, ...props }: LoaderProps) => {
  return (
    <div>
      <div
        {...props}
        className={clsx('mb-2 flex h-20 justify-center py-6', className)}
        data-testid="loader"
      >
        <span className={styles.loader} />
      </div>
      {children}
    </div>
  );
};

export default Loader;
