import { LoaderCircle } from 'lucide-react';
import { cx } from '@/lib/utils';
import './Spinner.css';

export const Spinner = ({ className = '', ...props }) => (
  <div className='spinner'>
    <LoaderCircle
      className={cx('loader', className)}
      role='status'
      aria-label='Loading'
      {...props}
    />
  </div>
);
