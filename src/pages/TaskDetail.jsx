import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
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
  const { tasks, removeTask } = useGlobalContext();
  const task = tasks.data?.find(t => t.id === Number(id));
  useDocumentTitle(task?.title);

  switch (tasks.step) {
    case 'idle':
    case 'loading':
      return <Spinner aria-label='Loading task' />;

    case 'error':
      return <p role='alert'>{tasks.error}</p>;

    case 'success':
      if (!task) return <h1>Task not found</h1>;

      const handleRemoveTask = async () => {
        try {
          await removeTask(task.id);
        } catch (error) {
          toast.error(`Could not delete "${task.title}"`, {
            description: error?.message,
          });
          return;
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
              <Button
                variant={Button.variant.danger}
                onClick={handleRemoveTask}
              >
                Elimina Task
              </Button>
            </div>
          </Card.Content>
        </Card>
      );

    default:
      return null;
  }
};
