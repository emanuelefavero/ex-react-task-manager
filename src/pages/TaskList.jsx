import { TaskTable } from '@/components/tasks/TaskTable';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './TaskList.css';

const PAGE_TITLE = `Task List`;

const renderTasks = tasks => {
  switch (tasks.step) {
    case 'idle':
    case 'loading':
      return <Spinner aria-label='Loading tasks' />;

    case 'error':
      return <p role='alert'>{tasks.error}</p>;

    case 'success':
      const { data } = tasks;

      if (!data || data.length === 0) return <p>No tasks available</p>;
      return <TaskTable tasks={data} />;

    default:
      return null;
  }
};

export const TaskList = () => {
  useDocumentTitle();
  const { tasks } = useGlobalContext();

  return (
    <>
      <h1>{PAGE_TITLE}</h1>
      <Card className='task-panel'>{renderTasks(tasks)}</Card>
    </>
  );
};
