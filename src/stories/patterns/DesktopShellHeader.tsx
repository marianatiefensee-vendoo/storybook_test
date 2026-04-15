import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './desktop-shell-header.stories.css';

export interface DesktopShellHeaderProps
  extends Omit<ComponentPropsWithoutRef<'header'>, 'children'> {
  logo?: ReactNode;
  trailing?: ReactNode;
}

export const DesktopShellHeader = forwardRef<HTMLElement, DesktopShellHeaderProps>(
  function DesktopShellHeader({ logo, trailing, className = '', ...headerProps }, ref) {
    const classes = ['desktop-shell-header', className].filter(Boolean).join(' ');

    return (
      <header ref={ref} className={classes} {...headerProps}>
        {logo != null ? (
          <div className="desktop-shell-header__logo">{logo}</div>
        ) : null}
        {trailing != null ? (
          <div className="desktop-shell-header__trailing">{trailing}</div>
        ) : null}
      </header>
    );
  },
);

DesktopShellHeader.displayName = 'DesktopShellHeader';

// ShellHeaderQuota — local display widget, not a public DS primitive.
// Pattern-specific; lives here and is only used by DesktopShellHeader compositions.

export interface ShellHeaderQuotaProps {
  used: number;
  total: number;
  unit?: string;
  period?: string;
}

export function ShellHeaderQuota({
  used,
  total,
  unit = 'Items',
  period,
}: ShellHeaderQuotaProps) {
  return (
    <div className="shell-header-quota">
      <p className="shell-header-quota__primary">
        {used} / {total} {unit}
      </p>
      {period != null ? (
        <p className="shell-header-quota__secondary">{period}</p>
      ) : null}
    </div>
  );
}
