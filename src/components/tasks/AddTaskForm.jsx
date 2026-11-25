import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FieldMessage } from '@/components/ui/FieldMessage';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import './AddTaskForm.css';

const STATUS_OPTIONS = ['To do', 'Doing', 'Done'];
const DEFAULT_STATUS = STATUS_OPTIONS[0];
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~';

const validateTitle = title => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) return 'Title cannot be empty';
  if ([...trimmedTitle].some(char => SYMBOLS.includes(char)))
    return 'Title cannot contain special characters';

  return '';
};

export const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const titleValidationError = validateTitle(title);

  const handleTitleChange = e => {
    const { value: newTitle } = e.target;
    setTitle(newTitle);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (titleValidationError) {
      setShowErrors(true);
      return;
    }

    const task = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    console.log('Task: ', task);
  };

  return (
    <form onSubmit={handleSubmit} className='add-task-form'>
      <div className='form-field'>
        <Label htmlFor='title'>Title</Label>
        <Input
          placeholder='Title'
          id='title'
          value={title}
          onChange={handleTitleChange}
          aria-invalid={showErrors && !!titleValidationError}
          aria-describedby='title-error'
        />
        <FieldMessage id='title-error' variant={FieldMessage.variant.danger}>
          {showErrors && titleValidationError}
        </FieldMessage>
      </div>
      <div className='form-field'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          ref={descriptionRef}
          placeholder='Description'
          id='description'
        />
      </div>
      <div className='form-field'>
        <Label htmlFor='status'>Status</Label>
        <Select ref={statusRef} id='status' defaultValue={DEFAULT_STATUS}>
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>

      <div className='buttons'>
        <Button type='submit'>Add Task</Button>
      </div>
    </form>
  );
};
