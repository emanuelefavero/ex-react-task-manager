import { useMemo, useState } from 'react';
import { TaskTable } from '@/components/tasks/TaskTable';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { STATUS_OPTIONS } from '@/data/tasks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './TaskList.css';

const PAGE_TITLE = `Task List`;

const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_ORDER = 1;

export const TaskList = () => {
  useDocumentTitle();
  const { tasks } = useGlobalContext();
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);

  const sortedTasks = useMemo(() => {
    if (tasks.step !== 'success') return [];

    return tasks.data.toSorted((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title) * sortOrder;

        case 'status':
          const statusDiff =
            STATUS_OPTIONS.indexOf(a.status) - STATUS_OPTIONS.indexOf(b.status);
          return statusDiff * sortOrder;

        default:
          const createdAtDiff =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          return createdAtDiff * sortOrder;
      }
    });
  }, [tasks, sortBy, sortOrder]);

  const handleSort = column => {
    if (column === sortBy) {
      setSortOrder(prev => -prev); // Reverse sort order if same column clicked
      return;
    }

    // Set sortBy and reset sort order to default if new column clicked
    setSortBy(column);
    setSortOrder(DEFAULT_SORT_ORDER);
  };

  const renderTasks = () => {
    switch (tasks.step) {
      case 'idle':
      case 'loading':
        return <Spinner aria-label='Loading tasks' />;

      case 'error':
        return <p role='alert'>{tasks.error}</p>;

      case 'success':
        if (!sortedTasks.length) return <p>No tasks available</p>;

        return (
          <TaskTable
            tasks={sortedTasks}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1>{PAGE_TITLE}</h1>
      <Card className='task-panel'>{renderTasks()}</Card>
    </>
  );
};
