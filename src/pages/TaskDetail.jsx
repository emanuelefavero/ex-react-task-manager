import { useParams } from 'react-router';
import { TaskStatusBadge } from '@/components/tasks/TaskStatusBadge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDate } from '@/lib/date';
import './TaskDetail.css';

export const TaskDetail = () => {
  const { id } = useParams();
  const { tasks } = useGlobalContext();
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
                onClick={() => console.log('Delete task', id)}
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
