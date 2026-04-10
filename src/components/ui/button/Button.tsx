import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import './button.css';

export type ButtonVariant = 'filled' | 'outline' | 'text' | 'tonal';
export type ButtonSize = 'medium' | 'small';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

const variantClassNames: Record<ButtonVariant, string> = {
  filled: 'button--filled',
  outline: 'button--outline',
  text: 'button--text',
  tonal: 'button--tonal',
};

const sizeClassNames: Record<ButtonSize, string> = {
  medium: 'button--medium',
  small: 'button--small',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'filled',
    size = 'medium',
    loading = false,
    leadingIcon,
    trailingIcon,
    children,
    className = '',
    disabled,
    type = 'button',
    ...buttonProps
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const classes = [
    'button',
    variantClassNames[variant],
    sizeClassNames[size],
    loading ? 'button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showCompactLoadingState = loading && variant === 'filled' && size === 'small';

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-loading={loading ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      {...buttonProps}
    >
      {showCompactLoadingState ? (
        <>
          <span className="button__sr-only">{children}</span>
          <span aria-hidden="true" className="button__loading">
            <span className="button__spinner" />
          </span>
        </>
      ) : (
        <>
          {leadingIcon ? (
            <span aria-hidden="true" className="button__icon button__icon--leading">
              {leadingIcon}
            </span>
          ) : null}
          <span className="button__label">{children}</span>
          {trailingIcon ? (
            <span aria-hidden="true" className="button__icon button__icon--trailing">
              {trailingIcon}
            </span>
          ) : null}
          {loading ? (
            <span aria-hidden="true" className="button__loading button__loading--inline">
              <span className="button__spinner" />
            </span>
          ) : null}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
