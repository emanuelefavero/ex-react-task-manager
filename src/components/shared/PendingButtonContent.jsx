import { Spinner } from '@/components/ui/Spinner';
import './PendingButtonContent.css';

export const PendingButtonContent = ({
  pending,
  spinnerSize = '1em',
  children,
}) => (
  <span className='pending-button-content' data-pending={pending || undefined}>
    <span>{children}</span>
    {pending && <Spinner inline size={spinnerSize} aria-hidden='true' />}
  </span>
);
