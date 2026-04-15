import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';

import { NavRailItem } from './NavRailItem';
import { NavigationRail } from './NavigationRail';
import { Icon } from '../icon/Icon';
import { BrandMark } from '../brand/Brand';
import { createFigmaDesign } from '../../../stories/figma-design';
import './navigation-rail.stories.css';

const navigationRailDesignUrl =
  'https://www.figma.com/design/941LilI1FqImC2usHWp0qN/Listing-Flow-Draft--Recreate-?node-id=1140-12447&m=dev';

type NavItemId =
  | 'inventory'
  | 'automations'
  | 'analytics'
  | 'marketplaces'
  | 'bulk-actions'
  | 'settings';

type NavigationRailStoryArgs = {
  ariaLabel: string;
  expanded: boolean;
  selectedItem: NavItemId;
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

function NavigationRailChromeButton({
  label,
  iconName,
}: {
  label: string;
  iconName: 'menu' | 'menu_open';
}) {
  return (
    <button type="button" aria-label={label} className="navigation-rail-story__chrome-button">
      <Icon name={iconName} />
    </button>
  );
}

function NavigationRailFab({ expanded }: { expanded: boolean }) {
  return (
    <button
      type="button"
      aria-label="Add item"
      className={[
        'navigation-rail-story__fab',
        expanded ? '' : 'navigation-rail-story__fab--icon-only',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon name="plus_circle" />
      {expanded ? <span>Add item</span> : null}
    </button>
  );
}

const meta = {
  title: 'Components/NavigationRail',
  component: NavigationRail,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(navigationRailDesignUrl),
    docs: {
      description: {
        component:
          'Structural navigation rail container for the desktop shell. The playground demonstrates how rail items collapse into the docked state and how selection moves across the set.',
      },
    },
  },
  args: {
    ariaLabel: 'Primary navigation',
    expanded: true,
    selectedItem: 'inventory',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
    },
    expanded: {
      control: 'boolean',
    },
    selectedItem: {
      control: 'radio',
      options: navItems.map((item) => item.id),
    },
  },
} satisfies Meta<NavigationRailStoryArgs> & { component: typeof NavigationRail };

export default meta;

type Story = StoryObj<NavigationRailStoryArgs>;

function renderNavigationRail(args: NavigationRailStoryArgs) {
  const [selectedItem, setSelectedItem] = useState(args.selectedItem);

  useEffect(() => {
    setSelectedItem(args.selectedItem);
  }, [args.selectedItem]);

  return (
    <div className="navigation-rail-story__panel">
      <NavigationRail
        ariaLabel={args.ariaLabel}
        expanded={args.expanded}
        className="navigation-rail-story__frame"
      >
        <div className="navigation-rail-story__brand">
          <BrandMark className="navigation-rail-story__brand-mark" />
        </div>
        <div className="navigation-rail-story__menu-fab">
          <NavigationRailChromeButton
            label={args.expanded ? 'Collapse rail' : 'Expand rail'}
            iconName={args.expanded ? 'menu_open' : 'menu'}
          />
          <NavigationRailFab expanded={args.expanded} />
        </div>
        <div className="navigation-rail-story__stack navigation-rail-story__stack--rail">
          {navItems.slice(0, 5).map((item) => (
            <NavRailItem
              key={item.id}
              layout="rail"
              icon={<Icon name={item.iconName} />}
              label={item.label}
              selected={selectedItem === item.id}
              onClick={() => {
                setSelectedItem(item.id);
              }}
            />
          ))}
        </div>
        <div className="navigation-rail-story__footer">
          <NavRailItem
            layout="rail"
            icon={<Icon name="settings" />}
            label="Settings"
            selected={selectedItem === 'settings'}
            onClick={() => {
              setSelectedItem('settings');
            }}
          />
        </div>
      </NavigationRail>
    </div>
  );
}

export const Playground: Story = {
  render: renderNavigationRail,
  play: async ({ canvas }) => {
    const inventory = canvas.getByRole('button', { name: /Inventory/i });
    const settings = canvas.getByRole('button', { name: /Settings/i });

    await userEvent.click(inventory);
    await waitFor(() => expect(inventory).toHaveAttribute('aria-current', 'page'));
    await userEvent.click(settings);
    await waitFor(() => expect(canvas.getByRole('button', { name: /Settings/i })).toHaveAttribute('aria-current', 'page'));
    await expect(canvas.getByRole('button', { name: /Inventory/i })).not.toHaveAttribute('aria-current', 'page');
  },
};

export const ExpandedAndDocked: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__grid">
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Expanded</p>
        <NavigationRail ariaLabel="Primary navigation" expanded className="navigation-rail-story__frame">
          <div className="navigation-rail-story__brand">
            <BrandMark className="navigation-rail-story__brand-mark" />
          </div>
          <div className="navigation-rail-story__menu-fab">
            <NavigationRailChromeButton label="Collapse rail" iconName="menu_open" />
            <NavigationRailFab expanded />
          </div>
          <div className="navigation-rail-story__stack navigation-rail-story__stack--rail">
            {navItems.slice(0, 5).map((item, index) => (
              <NavRailItem
                key={item.id}
                layout="rail"
                icon={<Icon name={item.iconName} />}
                label={item.label}
                selected={index === 0}
              />
            ))}
          </div>
          <div className="navigation-rail-story__footer">
            <NavRailItem layout="rail" icon={<Icon name="settings" />} label="Settings" />
          </div>
        </NavigationRail>
      </div>
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Docked</p>
        <NavigationRail
          ariaLabel="Primary navigation"
          expanded={false}
          className="navigation-rail-story__frame"
        >
          <div className="navigation-rail-story__brand">
            <BrandMark className="navigation-rail-story__brand-mark" />
          </div>
          <div className="navigation-rail-story__menu-fab">
            <NavigationRailChromeButton label="Expand rail" iconName="menu" />
            <NavigationRailFab expanded={false} />
          </div>
          <div className="navigation-rail-story__stack navigation-rail-story__stack--rail">
            {navItems.slice(0, 5).map((item, index) => (
              <NavRailItem
                key={item.id}
                layout="rail"
                icon={<Icon name={item.iconName} />}
                label={item.label}
                selected={index === 0}
              />
            ))}
          </div>
          <div className="navigation-rail-story__footer">
            <NavRailItem layout="rail" icon={<Icon name="settings" />} label="Settings" />
          </div>
        </NavigationRail>
      </div>
    </div>
  ),
};
