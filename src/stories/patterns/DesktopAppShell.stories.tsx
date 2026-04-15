import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';

import { AppBar } from '../../components/ui/app-bar/AppBar';
import { AppBarHeadlineBlock } from '../../components/ui/app-bar/AppBarHeadlineBlock';
import { Icon } from '../../components/ui/icon/Icon';
import { IconButton } from '../../components/ui/icon-button/IconButton';
import { createFigmaDesign } from '../figma-design';
import { DesktopShellLayout, type NavItemId } from './DesktopShellLayout';
import './desktop-app-shell.stories.css';

const desktopAppShellDesignUrl =
  'https://www.figma.com/design/LS1yOsOQqbFFpG4c8T2kQO/Go-Flow-Design-System?node-id=1-6095&m=dev';

type DesktopAppShellStoryArgs = {
  expanded: boolean;
  selectedNavItem: NavItemId;
  appBarSize: 'small' | 'medium' | 'large';
  appBarElevation: 'flat' | 'scrolled';
};

function DesktopShellIconButton({
  label,
  iconName,
}: {
  label: string;
  iconName: 'menu' | 'menu_open' | 'more_vertical' | 'search' | 'plus_circle';
}) {
  return (
    <IconButton icon={<Icon name={iconName} />} label={label} size="medium" variant="standard" />
  );
}

function MockContentBody() {
  return (
    <div className="desktop-app-shell__body">
      <div className="desktop-app-shell__card" />
      <div className="desktop-app-shell__card" />
      <div className="desktop-app-shell__card" />
    </div>
  );
}

function buildAppBar(args: Pick<DesktopAppShellStoryArgs, 'appBarSize' | 'appBarElevation'>) {
  return (
    <AppBar
      size={args.appBarSize}
      elevation={args.appBarElevation}
      leading={<DesktopShellIconButton label="Open navigation" iconName="menu" />}
      headline={
        <AppBarHeadlineBlock
          headline="Label"
          supportingText="Supporting Text"
          size={args.appBarSize}
        />
      }
      trailing={
        <div className="app-bar-story__actions">
          <DesktopShellIconButton label="Search" iconName="search" />
          <DesktopShellIconButton label="More options" iconName="more_vertical" />
          <DesktopShellIconButton label="Open navigation panel" iconName="menu_open" />
        </div>
      }
    />
  );
}

// Used as meta.component so Storybook autodocs generates docs from DesktopAppShellStoryArgs.
function DesktopAppShellPlayground(args: DesktopAppShellStoryArgs) {
  return (
    <DesktopShellLayout
      expanded={args.expanded}
      selectedNavItem={args.selectedNavItem}
      appBar={buildAppBar(args)}
    >
      <MockContentBody />
    </DesktopShellLayout>
  );
}

const navItemIds: NavItemId[] = [
  'inventory',
  'automations',
  'analytics',
  'marketplaces',
  'bulk-actions',
  'settings',
];

const meta = {
  title: 'Patterns/DesktopAppShell',
  component: DesktopAppShellPlayground,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: createFigmaDesign(desktopAppShellDesignUrl),
    docs: {
      description: {
        component:
          'Desktop shell pattern: site-level header, navigation rail, per-view app bar, and a content slot. Pass your view as children to test it in context. The rail IA (Inventory → Settings) is stable and baked in.',
      },
    },
  },
  args: {
    expanded: true,
    selectedNavItem: 'inventory',
    appBarSize: 'small',
    appBarElevation: 'flat',
  },
  argTypes: {
    expanded: {
      control: 'boolean',
    },
    selectedNavItem: {
      control: 'radio',
      options: navItemIds,
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

// Playground — interactive shell with nav selection and expand toggle.
export const Playground: Story = {
  render: (args) => {
    const [selectedNavItem, setSelectedNavItem] = useState<NavItemId>(args.selectedNavItem);
    const [expanded, setExpanded] = useState(args.expanded);

    useEffect(() => {
      setSelectedNavItem(args.selectedNavItem);
    }, [args.selectedNavItem]);

    useEffect(() => {
      setExpanded(args.expanded);
    }, [args.expanded]);

    return (
      <DesktopShellLayout
        expanded={expanded}
        onExpandToggle={() => setExpanded((e) => !e)}
        selectedNavItem={selectedNavItem}
        onNavItemSelect={setSelectedNavItem}
        appBar={buildAppBar(args)}
      >
        <MockContentBody />
      </DesktopShellLayout>
    );
  },
  play: async ({ canvas }) => {
    const automations = canvas.getByRole('button', { name: /Automations/i });
    await userEvent.click(automations);
    await waitFor(() => expect(automations).toHaveAttribute('aria-current', 'page'));

    const inventory = canvas.getByRole('button', { name: /Inventory/i });
    await userEvent.click(inventory);
    await waitFor(() => expect(inventory).toHaveAttribute('aria-current', 'page'));
    await expect(automations).not.toHaveAttribute('aria-current', 'page');
  },
};

// RailExpanded — static reference: rail with labels visible.
export const RailExpanded: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Rail in expanded state — labels visible, 220px wide.',
      },
    },
  },
  render: () => (
    <DesktopShellLayout expanded={true} selectedNavItem="inventory">
      <MockContentBody />
    </DesktopShellLayout>
  ),
};

// RailDocked — static reference: rail collapsed to icon-only.
export const RailDocked: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Rail in docked state — icon-only, 100px wide.',
      },
    },
  },
  render: () => (
    <DesktopShellLayout expanded={false} selectedNavItem="inventory">
      <MockContentBody />
    </DesktopShellLayout>
  ),
};

// WithShellHeader — full composition: site header + docked rail + app bar + content.
export const WithShellHeader: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Full desktop shell composition: site-level header (brand + quota + CTA + account) above the navigation rail and per-view app bar. This is the canonical integration target for engineering.',
      },
    },
  },
  render: () => (
    <DesktopShellLayout
      expanded={false}
      selectedNavItem="inventory"
      appBar={
        <AppBar
          size="small"
          elevation="flat"
          leading={<DesktopShellIconButton label="Open navigation" iconName="menu" />}
          headline={<AppBarHeadlineBlock headline="Inventory" supportingText="All items" />}
          trailing={
            <div className="app-bar-story__actions">
              <DesktopShellIconButton label="Search" iconName="search" />
              <DesktopShellIconButton label="More options" iconName="more_vertical" />
            </div>
          }
        />
      }
    >
      <MockContentBody />
    </DesktopShellLayout>
  ),
};
