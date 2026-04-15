import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

import { NavRailItem, type NavRailItemLayout } from './NavRailItem';
import { NavigationRail } from './NavigationRail';
import { Icon } from '../icon/Icon';
import { iconNames, type IconName } from '../icon/icon-names';
import { createFigmaDesign } from '../../../stories/figma-design';
import './navigation-rail.stories.css';

const navRailItemDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1-6095&m=dev';

type NavRailItemStoryArgs = {
  layout: NavRailItemLayout;
  railExpanded: boolean;
  label: string;
  selected: boolean;
  disabled: boolean;
  badgeMode: 'none' | 'compact' | 'prominent';
  badgeValue: string;
  iconName: IconName;
  onClick: () => void;
};

const meta = {
  title: 'Components/NavRailItem',
  component: NavRailItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    design: createFigmaDesign(navRailItemDesignUrl),
    docs: {
      description: {
        component:
          'Navigation item primitive for desktop bar and rail layouts. Use the playground to swap layouts and inspect selected, badge, and docked states.',
      },
    },
  },
  args: {
    layout: 'rail',
    railExpanded: true,
    label: 'Inventory',
    selected: false,
    disabled: false,
    badgeMode: 'none',
    badgeValue: '3',
    iconName: 'package',
    onClick: fn(),
  },
  argTypes: {
    layout: {
      control: 'radio',
      options: ['bar', 'rail'] satisfies NavRailItemLayout[],
    },
    railExpanded: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    selected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    badgeMode: {
      control: 'radio',
      options: ['none', 'compact', 'prominent'] as const,
    },
    badgeValue: {
      control: 'text',
    },
    iconName: {
      control: 'select',
      options: iconNames satisfies readonly IconName[],
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<NavRailItemStoryArgs> & { component: typeof NavRailItem };

export default meta;

type Story = StoryObj<NavRailItemStoryArgs>;

function renderNavRailItem(args: NavRailItemStoryArgs) {
  const [storyArgs, updateArgs] = useArgs<NavRailItemStoryArgs>();
  const resolvedArgs = {
    ...args,
    ...storyArgs,
  };

  const badge =
    resolvedArgs.badgeMode === 'none'
      ? undefined
      : resolvedArgs.badgeMode === 'compact'
        ? undefined
        : resolvedArgs.badgeValue;

  const badgeVariant =
    resolvedArgs.badgeMode === 'compact'
      ? 'compact'
      : resolvedArgs.badgeMode === 'prominent'
        ? 'prominent'
        : undefined;

  const selected = storyArgs.selected ?? args.selected;
  const item = (
    <NavRailItem
      layout={resolvedArgs.layout}
      selected={selected}
      disabled={resolvedArgs.disabled}
      icon={<Icon name={resolvedArgs.iconName} />}
      label={resolvedArgs.label}
      badge={badge}
      badgeVariant={badgeVariant}
      onClick={() => {
        resolvedArgs.onClick?.();
        updateArgs({ selected: !selected });
      }}
    />
  );

  return (
    <div className="navigation-rail-story__panel">
      {resolvedArgs.layout === 'rail' ? (
        <NavigationRail
          ariaLabel="Navigation rail preview"
          expanded={resolvedArgs.railExpanded}
        >
          {item}
        </NavigationRail>
      ) : (
        item
      )}
    </div>
  );
}

export const Playground: Story = {
  render: renderNavRailItem,
  play: async ({ canvas }) => {
    const item = canvas.getByRole('button', { name: /Inventory/i });

    await expect(item).not.toHaveAttribute('aria-current', 'page');
    await userEvent.click(item);
    await waitFor(() => expect(canvas.getByRole('button', { name: /Inventory/i })).toHaveAttribute('aria-current', 'page'));
    await userEvent.click(item);
    await waitFor(() => expect(canvas.getByRole('button', { name: /Inventory/i })).not.toHaveAttribute('aria-current', 'page'));
  },
};

export const States: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    layout: 'padded',
  },
  render: () => (
    <div className="navigation-rail-story__grid">
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Bar layout</p>
        <NavRailItem layout="bar" icon={<Icon name="package" />} label="Inventory" />
        <NavRailItem
          layout="bar"
          icon={<Icon name="package" />}
          label="Inventory"
          selected
        />
        <NavRailItem
          layout="bar"
          icon={<Icon name="package" />}
          label="Inventory"
          badge="3"
          badgeVariant="prominent"
          selected
        />
      </div>
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Rail expanded</p>
        <NavigationRail ariaLabel="Rail expanded preview" expanded>
          <NavRailItem layout="rail" icon={<Icon name="store" />} label="Marketplaces" />
          <NavRailItem
            layout="rail"
            icon={<Icon name="store" />}
            label="Marketplaces"
            selected
          />
          <NavRailItem
            layout="rail"
            icon={<Icon name="store" />}
            label="Marketplaces"
            badge="3"
            badgeVariant="prominent"
            selected
          />
        </NavigationRail>
      </div>
      <div className="navigation-rail-story__stack">
        <p className="navigation-rail-story__label">Rail docked</p>
        <NavigationRail ariaLabel="Rail docked preview" expanded={false}>
          <NavRailItem layout="rail" icon={<Icon name="store" />} label="Marketplaces" />
          <NavRailItem
            layout="rail"
            icon={<Icon name="store" />}
            label="Marketplaces"
            selected
          />
          <NavRailItem
            layout="rail"
            icon={<Icon name="store" />}
            label="Marketplaces"
            badge="3"
            badgeVariant="prominent"
            selected
          />
        </NavigationRail>
      </div>
    </div>
  ),
};
