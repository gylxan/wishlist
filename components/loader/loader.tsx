import styles from './loader.module.css';
import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export type LoaderProps = ComponentPropsWithoutRef<'div'>;
const Loader = ({ className, ...props }: LoaderProps) => {
  return (
    <div
      {...props}
      className={clsx('flex h-20 justify-center py-6', className)}
      data-testid="loader"
    >
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
