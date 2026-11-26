import { useParams } from 'react-router';
import { TaskStatusBadge } from '@/components/tasks/TaskStatusBadge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatDate } from '@/lib/date';

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
        <>
          <h1>{task.title}</h1>
          {task.description && <p>{task.description}</p>}
          <TaskStatusBadge status={task.status} />
          <p>{formatDate(task.createdAt)}</p>
          <Button onClick={() => console.log('Delete task', id)}>
            Elimina Task
          </Button>
        </>
      );

    default:
      return null;
  }
};
