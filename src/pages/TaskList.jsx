import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TaskTable } from '@/components/tasks/TaskTable';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
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
  const [searchQuery, setSearchQuery] = useState('');

  const timeoutRef = useRef(null);

  const debouncedSearch = useCallback(value => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const sortedTasks = useMemo(() => {
    if (tasks.step !== 'success') return [];

    const filteredTasks = tasks.data.filter(task =>
      task.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );

    return filteredTasks.toSorted((a, b) => {
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
  }, [tasks, sortBy, sortOrder, searchQuery]);

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
        if (tasks.data.length === 0) return <p>No tasks available</p>;
        if (sortedTasks.length === 0) return <p>No tasks match your search</p>;

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

      {tasks.step === 'success' && (
        <div className='task-search'>
          <Label htmlFor='search' srOnly>
            Search tasks
          </Label>
          <Input
            placeholder='Search tasks'
            id='search'
            onChange={e => debouncedSearch(e.target.value)}
          />
        </div>
      )}

      <Card className='task-panel'>{renderTasks()}</Card>
    </>
  );
};
