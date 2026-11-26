import { memo } from 'react';
import { Link } from 'react-router';
import { formatDate } from '@/lib/date';
import { getTaskDetailPath } from '@/router/paths';
import { TaskStatusBadge } from './TaskStatusBadge';
import './TaskRow.css';

export const TaskRow = memo(
  ({ id, title, status, createdAt }) =>
    title && (
      <tr className='task-row'>
        <td>
          <Link className='link' to={getTaskDetailPath(id)}>
            {title}
          </Link>
        </td>
        <td>
          <TaskStatusBadge status={status} />
        </td>
        <td>{formatDate(createdAt)}</td>
      </tr>
    ),
);
