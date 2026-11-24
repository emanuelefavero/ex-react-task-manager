import { memo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/date';
import './TaskRow.css';

const statusBadgeVariant = {
  'To do': Badge.variant.danger,
  Doing: Badge.variant.warning,
  Done: Badge.variant.success,
};

export const TaskRow = memo(
  ({ title, status, createdAt }) =>
    title && (
      <tr className='task-row'>
        <td>{title}</td>
        <td>
          <Badge variant={statusBadgeVariant[status] ?? Badge.variant.default}>
            {status}
          </Badge>
        </td>
        <td>{formatDate(createdAt)}</td>
      </tr>
    ),
);
