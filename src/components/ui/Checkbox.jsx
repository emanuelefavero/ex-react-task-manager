import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { cx } from '@/lib/utils';
import './Checkbox.css';

export const Checkbox = ({ className, ...props }) => (
  <CheckboxPrimitive.Root className={cx('checkbox', className)} {...props}>
    <CheckboxPrimitive.Indicator
      render={(indicatorProps, { indeterminate }) => {
        const Icon = indeterminate ? MinusIcon : CheckIcon;
        return <Icon {...indicatorProps} size={14} aria-hidden='true' />;
      }}
    />
  </CheckboxPrimitive.Root>
);
