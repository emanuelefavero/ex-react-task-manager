import { Undo2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { cx } from '@/lib/utils';
import { PATHS } from '@/router/paths';

const DEFAULT_LABEL = 'Back';

const buttonVariant = Object.freeze({
  primary: 'primary',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost',
});

export const BackButton = ({
  label,
  variant = buttonVariant.ghost,
  showLabel = false,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();
  const buttonLabel = label || DEFAULT_LABEL;
  const { pathname } = useLocation();

  const isHome = pathname === PATHS.HOME;

  if (isHome) return null;

  return (
    <Button
      onClick={() => navigate(-1)}
      aria-label={showLabel ? undefined : buttonLabel}
      variant={variant}
      className={cx(className)}
      title={buttonLabel}
      {...props}
    >
      <Undo2 />
      {showLabel && buttonLabel}
    </Button>
  );
};

BackButton.variant = buttonVariant;
