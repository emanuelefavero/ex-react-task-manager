import { LoaderCircle } from 'lucide-react';
import { cx } from '@/lib/utils';
import './Spinner.css';

export const Spinner = ({ inline = false, className = '', ...props }) => {
  const icon = (
    <LoaderCircle
      className={cx('spinner-icon', className)}
      role='status'
      aria-label='Loading'
      {...props}
    />
  );

  return inline ? icon : <div className='spinner'>{icon}</div>;
};
