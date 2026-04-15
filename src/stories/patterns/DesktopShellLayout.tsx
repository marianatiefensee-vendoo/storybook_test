import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import './desktop-shell-layout.css';

export interface DesktopShellLayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Site-level header row. Omit to suppress the header. */
  header?: ReactNode;
  /** Navigation rail content — compose with NavigationRail + NavRailItem. */
  rail?: ReactNode;
  /** Per-view app bar rendered above the content surface. Omit to remove. */
  appBar?: ReactNode;
  /** View content rendered inside the content surface. */
  children?: ReactNode;
}

export function DesktopShellLayout({
  header,
  rail,
  appBar,
  children,
  className = '',
  ...divProps
}: DesktopShellLayoutProps) {
  return (
    <div
      className={['desktop-shell-layout-wrapper', className].filter(Boolean).join(' ')}
      {...divProps}
    >
      {header}
      <div className="desktop-shell-layout">
        <aside className="desktop-shell-layout__rail">{rail}</aside>
        <section className="desktop-shell-layout__content">
          {appBar}
          <div className="desktop-shell-layout__surface">{children}</div>
        </section>
      </div>
    </div>
  );
}

DesktopShellLayout.displayName = 'DesktopShellLayout';
