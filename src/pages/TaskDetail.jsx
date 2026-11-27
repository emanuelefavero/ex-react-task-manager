import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { Modal } from '@/components/shared/Modal';
import { EditTaskModal } from '@/components/tasks/EditTaskModal';
import { TaskStatusBadge } from '@/components/tasks/TaskStatusBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDate } from '@/lib/date';
import { PATHS } from '@/router/paths';
import './TaskDetail.css';

export const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const task = tasks.data?.find(t => t.id === Number(id));
  useDocumentTitle(task?.title);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  switch (tasks.step) {
    case 'idle':
    case 'loading':
      return <Spinner aria-label='Loading task' />;

    case 'error':
      return <p role='alert'>{tasks.error}</p>;

    case 'success':
      if (!task) return <h1>Task not found</h1>;

      const handleSaveTask = async updatedTask => {
        setIsSaving(true);

        try {
          await updateTask(updatedTask);
        } catch (error) {
          toast.error(`Could not update "${updatedTask.title}"`, {
            description: error?.message,
          });
          return;
        } finally {
          setIsSaving(false);
        }

        toast.success(`Task "${updatedTask.title}" updated successfully`);
        setShowEditModal(false);
      };

      const handleRemoveTask = async () => {
        setIsDeleting(true);

        try {
          await removeTask(task.id);
        } catch (error) {
          toast.error(`Could not delete "${task.title}"`, {
            description: error?.message,
          });
          return;
        } finally {
          setIsDeleting(false);
        }

        toast.success('Task deleted successfully', {
          description: `"${task.title}"`,
        });
        navigate(PATHS.HOME);
      };

      return (
        <Card as='article' className='task-detail'>
          <Card.Header>
            <h1>{task.title}</h1>
            <TaskStatusBadge status={task.status} />
          </Card.Header>

          <Card.Content>
            {task.description && <p>{task.description}</p>}
            <p className='task-date'>
              <span>Created at</span>
              <time dateTime={task.createdAt}>
                {formatDate(task.createdAt)}
              </time>
            </p>
            <div className='task-actions'>
              {/* Edit Task Button and EditTaskModal */}
              <Button
                variant={Button.variant.primary}
                onClick={() => setShowEditModal(true)}
                disabled={isSaving}
              >
                Edit Task
              </Button>

              {showEditModal && (
                <EditTaskModal
                  show={showEditModal}
                  onClose={() => setShowEditModal(false)}
                  task={task}
                  onSave={handleSaveTask}
                  isSaving={isSaving}
                />
              )}

              {/* Delete Task Button and Modal */}
              <Button
                variant={Button.variant.danger}
                onClick={() => setShowModal(true)}
              >
                Delete Task
              </Button>

              <Modal
                title={`Delete "${task.title}"?`}
                content={<p>Are you sure you want to delete the task?</p>}
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleRemoveTask}
                confirmText={isDeleting ? 'Deleting…' : 'Delete task'}
                confirmDisabled={isDeleting}
              />
            </div>
          </Card.Content>
        </Card>
      );

    default:
      return null;
  }
};
