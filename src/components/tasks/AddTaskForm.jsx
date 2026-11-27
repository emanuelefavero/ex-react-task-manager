import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FieldMessage } from '@/components/ui/FieldMessage';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useGlobalContext } from '@/context/GlobalContext';
import { DEFAULT_STATUS, STATUS_OPTIONS } from '@/data/tasks';
import { taskTitleSchema, validate } from '@/lib/validation';
import './AddTaskForm.css';

export const AddTaskForm = ({ heading }) => {
  const { addTask } = useGlobalContext();
  const [title, setTitle] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const titleResult = validate(taskTitleSchema, title);
  const titleValidationError = titleResult.success ? '' : titleResult.error;

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!titleResult.success) {
      setShowErrors(true);
      return;
    }

    const task = {
      title: titleResult.data,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      await addTask(task);
    } catch (error) {
      toast.error(`Error while adding task "${task.title}"`, {
        description: error?.message,
      });
      return;
    } finally {
      setIsSubmitting(false);
    }

    toast.success('Task added successfully', {
      description: `"${task.title}"`,
    });

    // Reset form
    form.reset();
    setTitle('');
    setShowErrors(false);
  };

  return (
    <Card
      as='form'
      onSubmit={handleSubmit}
      className='add-task-form'
      aria-labelledby='add-task-heading'
    >
      <Card.Header>
        <h1 id='add-task-heading'>{heading}</h1>
      </Card.Header>

      <Card.Content>
        {/* Title */}
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            placeholder='Title'
            id='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setShowErrors(true)}
            aria-invalid={showErrors && !!titleValidationError}
            aria-describedby='title-error'
          />
          <FieldMessage id='title-error' variant={FieldMessage.variant.danger}>
            {showErrors && titleValidationError}
          </FieldMessage>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            ref={descriptionRef}
            placeholder='Description'
            id='description'
            rows={4}
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor='status'>Status</Label>
          <Select ref={statusRef} id='status' defaultValue={DEFAULT_STATUS}>
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </div>

        <div className='form-actions'>
          <Button type='submit' disabled={isSubmitting || !titleResult.success}>
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
