import { Button } from '@/components/ui/Button';
import { TaskRow } from './TaskRow';
import './TaskTable.css';
import { ListSortAscending, ListSortDescending } from 'lucide-react';

const SORTABLE_COLUMNS = [
  { key: 'title', label: 'Task' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
];

export const TaskTable = ({ tasks, sortBy, sortOrder, onSort }) =>
  tasks?.length > 0 && (
    <table className='task-table'>
      <thead>
        <tr>
          {SORTABLE_COLUMNS.map(({ key, label }) => {
            const isActive = sortBy === key;
            const direction = sortOrder === 1 ? 'ascending' : 'descending';
            const SortIcon =
              sortOrder === 1 ? ListSortAscending : ListSortDescending;

            return (
              <th
                key={key}
                scope='col'
                aria-sort={isActive ? direction : undefined}
              >
                <Button
                  variant={Button.variant.ghost}
                  className='task-sort-button'
                  onClick={() => onSort(key)}
                >
                  {label}
                  <SortIcon
                    size={15}
                    aria-hidden='true'
                    className='sort-icon'
                  />
                </Button>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
          />
        ))}
      </tbody>
    </table>
  );
