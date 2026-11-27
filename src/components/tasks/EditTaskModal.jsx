import { useRef, useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { DEFAULT_STATUS, STATUS_OPTIONS } from '@/data/tasks';

export const EditTaskModal = ({ show, onClose, task, onSave, isSaving }) => {
  const editFormRef = useRef(null);
  const [formData, setFormData] = useState(() => ({
    title: task.title,
    description: task.description ?? '',
    status: task.status ?? DEFAULT_STATUS,
  }));

  const title = formData.title.trim();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isSaving || !title) return;

    onSave({ id: task.id, ...formData, title });
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
        />
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
      confirmDisabled={isSaving || !title}
      confirmVariant={Button.variant.primary}
    />
  );
};
