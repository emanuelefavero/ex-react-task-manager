import { Badge } from '@/components/ui/Badge';

const statusBadgeVariant = {
  'To do': Badge.variant.danger,
  Doing: Badge.variant.warning,
  Done: Badge.variant.success,
};

export const TaskStatusBadge = ({ status }) =>
  status && (
    <Badge variant={statusBadgeVariant[status] ?? Badge.variant.default}>
      {status}
    </Badge>
  );
