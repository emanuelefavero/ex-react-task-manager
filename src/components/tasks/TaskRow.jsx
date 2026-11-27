import { memo } from 'react';
import { Link } from 'react-router';
import { Checkbox } from '@/components/ui/Checkbox';
import { formatDate } from '@/lib/date';
import { getTaskDetailPath } from '@/router/paths';
import { TaskStatusBadge } from './TaskStatusBadge';
import './TaskRow.css';

export const TaskRow = memo(
  ({ id, title, status, createdAt, checked, onToggle }) =>
    title && (
      <tr className='task-row'>
        <td>
          <div className='task-row-title'>
            <Checkbox
              checked={checked}
              onCheckedChange={() => onToggle(id)}
              aria-label={`Select task ${title}`}
            />
            <Link className='link' to={getTaskDetailPath(id)}>
              {title}
            </Link>
          </div>
        </td>
        <td>
          <TaskStatusBadge status={status} />
        </td>
        <td>{formatDate(createdAt)}</td>
      </tr>
    ),
);
