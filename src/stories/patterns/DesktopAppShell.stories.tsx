import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AppBar } from '../../components/ui/app-bar/AppBar';
import { AppBarHeadlineBlock } from '../../components/ui/app-bar/AppBarHeadlineBlock';
import { IconButton } from '../../components/ui/icon-button/IconButton';
import { NavRailItem } from '../../components/ui/navigation-rail/NavRailItem';
import { NavigationRail } from '../../components/ui/navigation-rail/NavigationRail';
import { Icon } from '../../components/ui/icon/Icon';
import { createFigmaDesign } from '../figma-design';
import './desktop-app-shell.stories.css';

const desktopAppShellDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1-6095&m=dev';

type NavItemId =
  | 'inventory'
  | 'automations'
  | 'analytics'
  | 'marketplaces'
  | 'bulk-actions'
  | 'settings';

type DesktopAppShellStoryArgs = {
  railExpanded: boolean;
  selectedNavItem: NavItemId;
  appBarSize: 'small' | 'medium' | 'large';
  appBarElevation: 'flat' | 'scrolled';
};

const navItems: Array<{
  id: NavItemId;
  label: string;
  iconName: 'package' | 'sync' | 'analytics' | 'store' | 'controls' | 'settings';
}> = [
  { id: 'inventory', label: 'Inventory', iconName: 'package' },
  { id: 'automations', label: 'Automations', iconName: 'sync' },
  { id: 'analytics', label: 'Analytics', iconName: 'analytics' },
  { id: 'marketplaces', label: 'Marketplaces', iconName: 'store' },
  { id: 'bulk-actions', label: 'Bulk Actions', iconName: 'controls' },
  { id: 'settings', label: 'Settings', iconName: 'settings' },
];

function DesktopShellIconButton({
  label,
  iconName,
}: {
  label: string;
  iconName: 'menu' | 'menu_open' | 'more_vertical' | 'search' | 'plus_circle';
}) {
  return (
    <IconButton
      className="desktop-app-shell__menu"
      icon={<Icon name={iconName} />}
      label={label}
      size="medium"
      variant="standard"
    />
  );
}

function DesktopShellFab({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Add item"
      className={[
        'desktop-app-shell__fab',
        iconOnly ? 'desktop-app-shell__fab--icon-only' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon name="plus_circle" />
      {iconOnly ? null : <span>Add item</span>}
    </button>
  );
}

function DesktopShellHeadline({
  size,
}: {
  size: DesktopAppShellStoryArgs['appBarSize'];
}) {
  if (size === 'small') {
    return (
      <div className="app-bar-story__small-headline">
        <p className="app-bar-story__small-headline-title">Label</p>
        <p className="app-bar-story__small-headline-supporting">Supporting Text</p>
      </div>
    );
  }

  return (
    <AppBarHeadlineBlock
      headline="Label"
      supportingText="Supporting Text"
      size={size}
    />
  );
}

const meta = {
  title: 'Patterns/DesktopAppShell',
  component: DesktopAppShellPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: createFigmaDesign(desktopAppShellDesignUrl),
    docs: {
      description: {
        component:
          'Desktop shell pattern composed from the navigation rail and top app bar primitives. Use the controls to switch rail density, selected navigation item, and app bar state.',
      },
    },
  },
  args: {
    railExpanded: true,
    selectedNavItem: 'inventory',
    appBarSize: 'small',
    appBarElevation: 'flat',
  },
  argTypes: {
    railExpanded: {
      control: 'boolean',
    },
    selectedNavItem: {
      control: 'radio',
      options: navItems.map((item) => item.id),
    },
    appBarSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'] as const,
    },
    appBarElevation: {
      control: 'radio',
      options: ['flat', 'scrolled'] as const,
    },
  },
} satisfies Meta<DesktopAppShellStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderDesktopAppShell(args: DesktopAppShellStoryArgs) {
  const selectedNavItem = args.selectedNavItem;
  const fabClick = fn();

  return (
    <div className="desktop-app-shell">
      <aside className="desktop-app-shell__rail">
        <div className="desktop-app-shell__brand">
          <img
            alt="Vendoo"
            className="desktop-app-shell__brand-mark"
            src="https://www.figma.com/api/mcp/asset/d2894c21-6448-4048-8359-7b02a6066a77"
          />
          <DesktopShellIconButton label={args.railExpanded ? 'Collapse rail' : 'Expand rail'} iconName={args.railExpanded ? 'menu_open' : 'menu'} />
          <DesktopShellFab iconOnly={!args.railExpanded} />
        </div>
        <NavigationRail ariaLabel="Primary navigation" expanded={args.railExpanded}>
          <div className="desktop-app-shell__rail-items">
            {navItems.slice(0, 5).map((item) => (
              <NavRailItem
                key={item.id}
                layout="rail"
                icon={<Icon name={item.iconName} />}
                label={item.label}
                selected={selectedNavItem === item.id}
                badge={item.id === 'inventory' ? '3' : undefined}
                badgeVariant={item.id === 'inventory' ? 'prominent' : undefined}
                onClick={() => fabClick()}
              />
            ))}
          </div>
        </NavigationRail>
        <div className="desktop-app-shell__footer">
          <NavRailItem
            layout="rail"
            icon={<Icon name="settings" />}
            label="Settings"
            selected={selectedNavItem === 'settings'}
            onClick={() => fabClick()}
          />
        </div>
      </aside>

      <section className="desktop-app-shell__content">
        <AppBar
          size={args.appBarSize}
          elevation={args.appBarElevation}
          leading={<DesktopShellIconButton label="Open navigation" iconName="menu" />}
          headline={<DesktopShellHeadline size={args.appBarSize} />}
          trailing={
            <div className="app-bar-story__actions">
              <DesktopShellIconButton label="Search" iconName="search" />
              <DesktopShellIconButton label="More options" iconName="more_vertical" />
              <DesktopShellIconButton label="Open navigation panel" iconName="menu_open" />
            </div>
          }
        />
        <div className="desktop-app-shell__surface">
          <div className="desktop-app-shell__body">
            <div className="desktop-app-shell__card" />
            <div className="desktop-app-shell__card" />
            <div className="desktop-app-shell__card" />
          </div>
        </div>
      </section>
    </div>
  );
}

function DesktopAppShellPreview(args: DesktopAppShellStoryArgs) {
  return renderDesktopAppShell(args);
}

export const Playground: Story = {
  render: renderDesktopAppShell,
};
