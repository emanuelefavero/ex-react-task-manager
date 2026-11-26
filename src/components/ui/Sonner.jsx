import { Toaster as Sonner } from 'sonner';
import './Sonner.css';

export const Toaster = ({ ...props }) => (
  <Sonner
    theme='system'
    position='bottom-right'
    closeButton
    toastOptions={{
      classNames: {
        toast: 'toast',
        title: 'toast-title',
        description: 'toast-description',
        success: 'success',
        error: 'error',
        warning: 'warning',
        info: 'info',
      },
    }}
    {...props}
  />
);
