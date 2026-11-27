import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';

// NOTE: base-ui (which is used in Dialog) already uses createPortal, so we could technically remove it here

export const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  confirmDisabled = false,
  confirmVariant = Button.variant.danger,
}) =>
  createPortal(
    <Dialog open={show} onOpenChange={open => !open && onClose()}>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>

        {content}

        <Dialog.Actions>
          <Dialog.Close render={<Button variant={Button.variant.outline} />}>
            Cancel
          </Dialog.Close>
          <Button
            onClick={onConfirm}
            variant={confirmVariant}
            disabled={confirmDisabled}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog.Content>
    </Dialog>,
    document.body,
  );
