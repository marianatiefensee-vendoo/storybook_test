import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { NavRailItem } from './NavRailItem';
import { NavigationRail } from './NavigationRail';
import { Icon } from '../icon/Icon';
import { createFigmaDesign } from '../../../stories/figma-design';
import './navigation-rail.stories.css';

const navigationRailDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=721-2225&m=dev';

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
          'Structural navigation rail container for the desktop shell. The playground demonstrates the container with NavRailItem children in expanded and docked states.',
      },
    },
  },
  args: {
    ariaLabel: 'Primary navigation',
    expanded: true,
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
    },
    expanded: {
      control: 'boolean',
    },
  },
} satisfies Meta<NavigationRailStoryArgs> & { component: typeof NavigationRail };

export default meta;

type Story = StoryObj<NavigationRailStoryArgs>;

function renderNavigationRail(args: NavigationRailStoryArgs) {
  return (
    <div className="navigation-rail-story__panel">
      <NavigationRail
        ariaLabel={args.ariaLabel}
        expanded={args.expanded}
        className="navigation-rail-story__frame"
      >
        {navItems.map((item, index) => (
          <NavRailItem
            key={item.id}
            layout="rail"
            icon={<Icon name={item.iconName} />}
            label={item.label}
            selected={index === 0}
          />
        ))}
      </NavigationRail>
    </div>
  );
}

export const Playground: Story = {
  render: renderNavigationRail,
  play: async ({ canvas }) => {
    const inventory = canvas.getByRole('button', { name: /Inventory/i });

    expect(inventory).toHaveAttribute('aria-current', 'page');
    expect(canvas.getByRole('button', { name: /Automations/i })).not.toHaveAttribute('aria-current', 'page');
  },
};

export const Expanded: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__panel">
      <NavigationRail ariaLabel="Primary navigation" expanded className="navigation-rail-story__frame">
        {navItems.map((item, index) => (
          <NavRailItem
            key={item.id}
            layout="rail"
            icon={<Icon name={item.iconName} />}
            label={item.label}
            selected={index === 0}
          />
        ))}
      </NavigationRail>
    </div>
  ),
};

export const Docked: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__panel">
      <NavigationRail
        ariaLabel="Primary navigation"
        expanded={false}
        className="navigation-rail-story__frame"
      >
        {navItems.map((item, index) => (
          <NavRailItem
            key={item.id}
            layout="rail"
            icon={<Icon name={item.iconName} />}
            label={item.label}
            selected={index === 0}
          />
        ))}
      </NavigationRail>
    </div>
  ),
};

export const NoSelection: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__panel">
      <NavigationRail ariaLabel="Primary navigation" expanded className="navigation-rail-story__frame">
        {navItems.map((item) => (
          <NavRailItem
            key={item.id}
            layout="rail"
            icon={<Icon name={item.iconName} />}
            label={item.label}
          />
        ))}
      </NavigationRail>
    </div>
  ),
};

export const CompositionExample: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__grid">
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Rail shell</p>
        <div className="navigation-rail-story__panel">
          <div className="navigation-rail-story__stack">
            <p className="navigation-rail-story__label">Expanded rail</p>
            <NavigationRail ariaLabel="Primary navigation" expanded className="navigation-rail-story__frame">
              {navItems.map((item, index) => (
                <NavRailItem
                  key={item.id}
                  layout="rail"
                  icon={<Icon name={item.iconName} />}
                  label={item.label}
                  selected={index === 0}
                />
              ))}
            </NavigationRail>
          </div>
          <div className="navigation-rail-story__stack">
            <p className="navigation-rail-story__label">Docked rail</p>
            <NavigationRail ariaLabel="Primary navigation" expanded={false} className="navigation-rail-story__frame">
              {navItems.map((item, index) => (
                <NavRailItem
                  key={item.id}
                  layout="rail"
                  icon={<Icon name={item.iconName} />}
                  label={item.label}
                  selected={index === 0}
                />
              ))}
            </NavigationRail>
          </div>
        </div>
      </div>
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Real shell composition</p>
        <div className="navigation-rail-story__panel">
          <div className="navigation-rail-story__stack">
            <p className="navigation-rail-story__label">Header slot</p>
            <div className="navigation-rail-story__menu-fab">
              <button type="button" aria-label="Collapse rail" className="navigation-rail-story__chrome-button">
                <Icon name="menu_open" />
              </button>
              <button type="button" aria-label="Add item" className="navigation-rail-story__fab">
                <Icon name="plus_circle" />
                <span>Add item</span>
              </button>
            </div>
          </div>
          <NavigationRail ariaLabel="Primary navigation" expanded className="navigation-rail-story__frame">
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
    </div>
  ),
};
