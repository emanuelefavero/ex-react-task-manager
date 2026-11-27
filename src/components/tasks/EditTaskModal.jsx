import { useRef, useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/Button';
import { FieldMessage } from '@/components/ui/FieldMessage';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { DEFAULT_STATUS, STATUS_OPTIONS } from '@/data/tasks';
import { taskTitleSchema, validate } from '@/lib/validation';

export const EditTaskModal = ({ show, onClose, task, onSave, isSaving }) => {
  const editFormRef = useRef(null);
  const [formData, setFormData] = useState(() => ({
    title: task.title,
    description: task.description ?? '',
    status: task.status ?? DEFAULT_STATUS,
  }));
  const [showErrors, setShowErrors] = useState(false);

  const titleResult = validate(taskTitleSchema, formData.title);
  const titleValidationError = titleResult.success ? '' : titleResult.error;

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isSaving) return;

    if (!titleResult.success) {
      setShowErrors(true);
      return;
    }

    onSave({ id: task.id, ...formData, title: titleResult.data });
  };

  const handleConfirm = () => editFormRef.current?.requestSubmit();

  const editTaskForm = (
    <form ref={editFormRef} onSubmit={handleSubmit}>
      <div>
        <Label htmlFor='edit-title'>Title</Label>
        <Input
          id='edit-title'
          name='title'
          placeholder='Title'
          value={formData.title}
          onChange={handleChange}
          onBlur={() => setShowErrors(true)}
          aria-invalid={showErrors && !!titleValidationError}
          aria-describedby='edit-title-error'
        />
        <FieldMessage
          id='edit-title-error'
          variant={FieldMessage.variant.danger}
        >
          {showErrors && titleValidationError}
        </FieldMessage>
      </div>

      <div>
        <Label htmlFor='edit-description'>Description</Label>
        <Textarea
          id='edit-description'
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor='edit-status'>Status</Label>
        <Select
          id='edit-status'
          name='status'
          value={formData.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );

  return (
    <Modal
      title={`Edit Task "${task.title}"`}
      content={editTaskForm}
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText={isSaving ? 'Saving...' : 'Save'}
      confirmDisabled={isSaving || !titleResult.success}
      confirmVariant={Button.variant.primary}
    />
  );
};
