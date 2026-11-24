import { cx } from '@/lib/utils';
import './Badge.css';

const badgeVariant = Object.freeze({
  default: 'default',
  warning: 'warning',
  danger: 'danger',
  success: 'success',
});

export const Badge = ({
  variant = badgeVariant.default,
  className = '',
  ...props
}) => (
  <span className={cx('badge', 'text-xs', variant, className)} {...props} />
);

Badge.variant = badgeVariant;
