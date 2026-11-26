import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';
import './Dialog.css';

export const Dialog = props => <DialogPrimitive.Root {...props} />;

const DialogTrigger = ({ render = <Button />, ...props }) => (
  <DialogPrimitive.Trigger render={render} {...props} />
);

const DialogContent = ({ className, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className='dialog-backdrop' />
    <DialogPrimitive.Popup
      className={cx('dialog-content', className)}
      {...props}
    />
  </DialogPrimitive.Portal>
);

const DialogTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title className={cx('dialog-title', className)} {...props} />
);

const DialogActions = ({ className, ...props }) => (
  <div className={cx('dialog-actions', className)} {...props} />
);

const DialogClose = ({ render = <Button />, ...props }) => (
  <DialogPrimitive.Close render={render} {...props} />
);

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Actions = DialogActions;
Dialog.Close = DialogClose;
