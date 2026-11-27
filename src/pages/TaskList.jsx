import { Trash } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { PendingButtonContent } from '@/components/shared/PendingButtonContent';
import { TaskTable } from '@/components/tasks/TaskTable';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Spinner } from '@/components/ui/Spinner';
import { useGlobalContext } from '@/context/GlobalContext';
import { STATUS_OPTIONS } from '@/data/tasks';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { STEPS } from '@/store/tasksReducer';
import './TaskList.css';

const PAGE_TITLE = `Task List`;

const DEFAULT_SORT_BY = 'createdAt';
const DEFAULT_SORT_ORDER = 1;

export const TaskList = () => {
  useDocumentTitle();
  const { tasks, removeMultipleTasks } = useGlobalContext();
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const hasSelectedTasks = selectedTaskIds.length > 0;
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  // Debounced search handler using a timeout ref to delay updating the search query
  const debouncedSearch = useCallback(value => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  // Cleanup timeout on component unmount to prevent memory leaks
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Calculate sorted and filtered tasks based on search query and sort options
  const sortedTasks = useMemo(() => {
    if (tasks.step !== STEPS.SUCCESS) return [];

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

  const toggleSelection = useCallback(
    taskId =>
      setSelectedTaskIds(
        prev =>
          prev.includes(taskId) // Is task selected?
            ? prev.filter(id => id !== taskId) // Deselect it
            : [...prev, taskId], // Select it
      ),
    [],
  );

  const handleRemoveSelected = async () => {
    setIsDeleting(true);

    try {
      await removeMultipleTasks(selectedTaskIds);
      toast.success('Selected tasks deleted');
      setSelectedTaskIds([]);
    } catch (error) {
      const failedIds = error.failedIds ?? [];

      // Keep only the tasks that failed to delete in the selection
      setSelectedTaskIds(prev => prev.filter(id => failedIds.includes(id)));

      toast.error('Failed to delete some tasks', {
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const renderTasks = () => {
    switch (tasks.step) {
      case STEPS.IDLE:
      case STEPS.LOADING:
        return <Spinner aria-label='Loading tasks' />;

      case STEPS.ERROR:
        return (
          <p className='task-list-error' role='alert'>
            {tasks.error}
          </p>
        );

      case STEPS.SUCCESS:
        if (tasks.data.length === 0) return <p>No tasks available</p>;
        if (sortedTasks.length === 0) return <p>No tasks match your search</p>;

        return (
          <Card className='task-panel'>
            <TaskTable
              tasks={sortedTasks}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              selectedTaskIds={selectedTaskIds}
              onToggle={toggleSelection}
            />
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h1>{PAGE_TITLE}</h1>

      {tasks.step === STEPS.SUCCESS && (
        <div className='task-action-bar'>
          <Label htmlFor='search' srOnly>
            Search tasks
          </Label>
          <Input
            placeholder='Search tasks'
            id='search'
            onChange={e => debouncedSearch(e.target.value)}
          />

          <Button
            variant={Button.variant.danger}
            onClick={handleRemoveSelected}
            disabled={!hasSelectedTasks || isDeleting}
            aria-label='Delete selected tasks'
            title='Delete selected tasks'
          >
            <PendingButtonContent pending={isDeleting} spinnerSize={24}>
              <Trash aria-hidden='true' />
            </PendingButtonContent>
          </Button>
        </div>
      )}

      {renderTasks()}
    </>
  );
};
