import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './icon-button.css';

export type IconButtonVariant = 'standard' | 'outline' | 'filled' | 'tonal';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    label,
    variant = 'standard',
    size = 'medium',
    className = '',
    disabled = false,
    type = 'button',
    ...buttonProps
  },
  ref,
) {
  const classes = ['icon-button', `icon-button--${variant}`, `icon-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      data-variant={variant}
      data-size={size}
      {...buttonProps}
    >
      <span className="icon-button__content">
        <span aria-hidden="true" className="icon-button__icon">
          {icon}
        </span>
        <span className="icon-button__sr-only">{label}</span>
      </span>
    </button>
  );
});

IconButton.displayName = 'IconButton';
