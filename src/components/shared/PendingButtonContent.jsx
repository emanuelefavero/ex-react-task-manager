import { LoaderCircle } from 'lucide-react';
import './PendingButtonContent.css';

export const PendingButtonContent = ({ pending, children }) => (
  <span className='pending-button-content' data-pending={pending || undefined}>
    <span>{children}</span>
    {pending && (
      <LoaderCircle size='1em' aria-hidden='true' className='animate-spin' />
    )}
  </span>
);
