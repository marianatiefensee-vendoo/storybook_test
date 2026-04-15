import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Button } from '../../components/ui/button/Button';
import { Icon } from '../../components/ui/icon/Icon';
import { IconButton } from '../../components/ui/icon-button/IconButton';
import { NavRailItem } from '../../components/ui/navigation-rail/NavRailItem';
import { NavigationRail } from '../../components/ui/navigation-rail/NavigationRail';
import { BrandLockup } from '../../components/ui/brand/Brand';
import { DesktopShellHeader, ShellHeaderQuota } from './DesktopShellHeader';
import './desktop-shell-layout.css';

export type NavItemId =
  | 'inventory'
  | 'automations'
  | 'analytics'
  | 'marketplaces'
  | 'bulk-actions'
  | 'settings';

const NAV_ITEMS: Array<{
  id: NavItemId;
  label: string;
  iconName: 'package' | 'sync' | 'analytics' | 'store' | 'controls';
}> = [
  { id: 'inventory', label: 'Inventory', iconName: 'package' },
  { id: 'automations', label: 'Automations', iconName: 'sync' },
  { id: 'analytics', label: 'Analytics', iconName: 'analytics' },
  { id: 'marketplaces', label: 'Marketplaces', iconName: 'store' },
  { id: 'bulk-actions', label: 'Bulk Actions', iconName: 'controls' },
];

export interface DesktopShellLayoutProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Whether the rail is expanded (labels visible) or docked (icon-only). Default: true. */
  expanded?: boolean;
  /** Called when the menu toggle button is clicked. */
  onExpandToggle?: () => void;
  /** Currently active nav item. Default: 'inventory'. */
  selectedNavItem?: NavItemId;
  /** Called when a nav item is clicked. */
  onNavItemSelect?: (id: NavItemId) => void;
  /**
   * Site-level header row. Omit (undefined) for the default stub header.
   * Pass null to suppress the header entirely.
   */
  header?: ReactNode;
  /** Per-view app bar rendered above the content surface. Omit to remove. */
  appBar?: ReactNode;
  /** View content rendered inside the content surface. */
  children?: ReactNode;
}

function DefaultShellHeader() {
  return (
    <DesktopShellHeader
      logo={<BrandLockup className="desktop-shell-layout__brand-lockup" />}
      trailing={
        <>
          <ShellHeaderQuota used={0} total={125} unit="Items" period="Oct 10 – Nov 10" />
          <Button variant="filled" size="small">
            New Item
          </Button>
          <Button
            variant="outline"
            size="small"
            leadingIcon={<Icon name="user" />}
            trailingIcon={<Icon name="chevron_down" />}
          >
            Account
          </Button>
        </>
      }
    />
  );
}

export function DesktopShellLayout({
  expanded = true,
  onExpandToggle,
  selectedNavItem = 'inventory',
  onNavItemSelect,
  header,
  appBar,
  children,
  className = '',
  ...divProps
}: DesktopShellLayoutProps) {
  const resolvedHeader = header === undefined ? <DefaultShellHeader /> : header;
  const hasHeader = resolvedHeader != null;

  return (
    <div
      className={['desktop-shell-layout-wrapper', className].filter(Boolean).join(' ')}
      data-has-header={hasHeader ? 'true' : 'false'}
      {...divProps}
    >
      {resolvedHeader}
      <div className="desktop-shell-layout">
        <aside className="desktop-shell-layout__rail">
          <div className="desktop-shell-layout__rail-header">
            <IconButton
              className="desktop-shell-layout__menu"
              icon={<Icon name={expanded ? 'menu_open' : 'menu'} />}
              label={expanded ? 'Collapse rail' : 'Expand rail'}
              size="medium"
              variant="standard"
              onClick={onExpandToggle}
            />
            <button
              type="button"
              aria-label="Add item"
              className={[
                'desktop-shell-layout__fab',
                expanded ? '' : 'desktop-shell-layout__fab--icon-only',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Icon name="plus_circle" />
              {expanded ? <span>Add item</span> : null}
            </button>
          </div>
          <NavigationRail ariaLabel="Primary navigation" expanded={expanded}>
            <div className="desktop-shell-layout__rail-items">
              {NAV_ITEMS.map((item) => (
                <NavRailItem
                  key={item.id}
                  layout="rail"
                  icon={<Icon name={item.iconName} />}
                  label={item.label}
                  selected={selectedNavItem === item.id}
                  onClick={() => onNavItemSelect?.(item.id)}
                />
              ))}
            </div>
          </NavigationRail>
          <div className="desktop-shell-layout__rail-footer">
            <NavRailItem
              layout="rail"
              icon={<Icon name="settings" />}
              label="Settings"
              selected={selectedNavItem === 'settings'}
              onClick={() => onNavItemSelect?.('settings')}
            />
          </div>
        </aside>
        <section className="desktop-shell-layout__content">
          {appBar}
          <div className="desktop-shell-layout__surface">{children}</div>
        </section>
      </div>
    </div>
  );
}

DesktopShellLayout.displayName = 'DesktopShellLayout';
