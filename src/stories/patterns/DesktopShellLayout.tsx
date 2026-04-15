import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './desktop-shell-layout.css';

export interface DesktopShellLayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: ReactNode;
}

export function DesktopShellLayout({
  children,
  className = '',
  ...divProps
}: DesktopShellLayoutProps) {
  return (
    <div
      className={['desktop-shell-layout-wrapper', className].filter(Boolean).join(' ')}
      {...divProps}
    >
      {children}
    </div>
  );
}

DesktopShellLayout.displayName = 'DesktopShellLayout';
